<template>
	<div
		:class="containerClasses"
		:style="containerStyle"
	>
		<div :style="formContainerStyle">
			<v-container
				v-if="title"
				fluid
			>
				<v-row>
					<v-col>
						<h2>
							{{ title }}
						</h2>
					</v-col>
				</v-row>
			</v-container>

			<v-container
				:class="stepperContainerClasses"
				fluid
			>
				<v-stepper
					v-model="stepperModel"
					v-bind="settings"
					:mobile="sm"
					width="100%"
				>
					<template #default="{ prev, next }">
						<v-stepper-header>
							<template
								v-for="(page, i) in pages"
								:key="`${getIndex(i)}-step`"
							>
								<v-stepper-item
									:color="settings.color"
									:disabled="headerItemDisabled(page)"
									:edit-icon="page.isReview ? '$complete' : settings.editIcon"
									:editable="page.editable"
									elevation="0"
									:error="page.error"
									:title="page.title"
									:value="getIndex(i)"
								></v-stepper-item>
								<v-divider
									v-if="getIndex(i) !== Object.keys(pages).length"
									:key="getIndex(i)"
								></v-divider>
							</template>
						</v-stepper-header>

						<Form
							ref="stepperFormRef"
							v-slot="{ validate }"
							:keep-values-on-unmount="settings?.keepValuesOnUnmount"
							:validate-on-mount="settings?.validateOnMount"
							:validation-schema="validationSchema"
							@submit="onSubmit"
						>
							<v-stepper-window>
								<v-stepper-window-item
									v-for="page, i in pages"
									:key="`${getIndex(i)}-content`"
									:reverse-transition="transitionComputed"
									:transition="transitionComputed"
									:value="getIndex(i)"
								>
									<v-container>
										<PageContainer
											v-if="!page.isReview"
											:key="`${getIndex(i)}-page`"
											v-model="modelValue"
											:fieldColumns="settings?.fieldColumns"
											:index="getIndex(i)"
											:page="page"
											:settings="settings"
											@validate="onFieldValidate($event, next)"
										>
											<!-- ========================= Pass Slots -->
											<template
												v-for="(_, slot) in slots"
												#[slot]="scope"
											>
												<slot
													:name="slot"
													v-bind="{ ...scope }"
												/>
											</template>
										</PageContainer>
										<PageReviewContainer
											v-else
											v-model="modelValue"
											:page="page"
											:pages="pages"
											:settings="settings"
											:summary-columns="summaryColumns"
											@goToQuestion="stepperModel = $event"
											@submit="onSubmit(modelValue)"
										/>
									</v-container>
								</v-stepper-window-item>
							</v-stepper-window>

							<v-stepper-actions v-if="!settings.hideActions">
								<template #next>
									<v-btn
										v-if="!lastPage"
										:color="settings.color"
										:disabled="nextButtonDisabled"
										:size="navButtonSize"
										@click="runValidation(validate, 'next', next)"
									/>
									<v-btn
										v-else
										:color="settings.color"
										:disabled="fieldsHaveErrors"
										:size="navButtonSize"
										type="submit"
									>Submit</v-btn>
								</template>

								<template #prev>
									<v-btn
										:disabled="((stepperActionsDisabled === 'prev' || settings.disabled || canReviewPreviousButtonDisabled) as boolean)"
										:size="navButtonSize"
										@click="previousPage(prev)"
									/>
								</template>
							</v-stepper-actions>
						</Form>
					</template>
				</v-stepper>
			</v-container>
		</div>
	</div>
</template>

<script setup lang="ts">
// import {	VStepper } from 'vuetify/components';
// import { VStepperVertical } from 'vuetify/labs/VStepperVertical';
import { watchDeep } from '@vueuse/core';
import { Form } from 'vee-validate';
import { useDisplay } from 'vuetify';
import type {
	ComputedClasses,
	Field,
	Page,
	Props,
} from '@/plugin/types';
import type { PrivateFormContext } from 'vee-validate';
import PageContainer from './components/shared/PageContainer.vue';
import PageReviewContainer from './components/shared/PageReviewContainer.vue';
import {
	useContainerClasses,
	useStepperContainerClasses,
} from './composables/classes';
import {
	useBuildSettings,
	useColumnErrorCheck,
	useMergeProps,
} from './composables/helpers';
import componentEmits from './utils/emits';
import { AllProps } from './utils/props';
import { globalOptions } from './';


const attrs = useAttrs();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});


// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), AllProps);
let stepperProps: Settings = reactive<Settings>(useMergeProps(attrs, injectedOptions, props));
const { direction, title, width } = toRefs(props);
const pages = reactive<Page[]>(props.pages);
const originalPages = JSON.parse(JSON.stringify(pages));

const settings: Ref<Settings> = ref<Settings>(useBuildSettings(stepperProps));

watch(props, () => {
	stepperProps = useMergeProps(attrs, injectedOptions, props);
	settings.value = useBuildSettings(stepperProps);
}, { deep: true });

provide<Ref<Settings>>('settings', settings);


const allFieldsArray: Ref<Field[]> = ref<Field[]>([]);

Object.values(pages).forEach((p: Page) => {
	if (p.fields) {
		Object.values(p.fields).forEach((field: Field) => {
			allFieldsArray.value.push(field);
		});
	}
});


// const StepperComponent = markRaw(props.direction === 'vertical' ? VStepperVertical : VStepper);
// console.log('StepperComponent', StepperComponent);


// -------------------------------------------------- Mounted //
onMounted(() => {
	whenCallback();

	useColumnErrorCheck({
		columns: props.fieldColumns,
		propName: '"fieldColumns" prop',
	});

	useColumnErrorCheck({
		columns: props.summaryColumns,
		propName: '"summaryColumns" prop',
	});
});


// -------------------------------------------------- Data //
const modelValue = defineModel<any>();

watchDeep(modelValue, () => {
	callbacks();
});

const stepperModel = ref(1);


const { sm } = useDisplay();
const transitionComputed: ComputedRef<Props['transition']> = computed(() => stepperProps.transition);
const parentForm = useTemplateRef<PrivateFormContext>('stepperFormRef');

provide('parentForm', parentForm);


// -------------------------------------------------- Stepper Action //
const stepperActionsDisabled = computed(() => {
	return stepperModel.value === 1 ? 'prev' : stepperModel.value === Object.keys(props.pages).length ? 'next' : undefined;
});

const nextButtonDisabled = computed(() => {
	const isDisabled = ((stepperActionsDisabled.value === 'next' || settings.value.disabled) as boolean);

	return fieldsHaveErrors.value || isDisabled;
});

// TODO: Make this disabled if the previous page is not editable //
const canReviewPreviousButtonDisabled = computed<boolean>(() => {
	return stepperModel.value === pages.length && !props.canReview;
});


// ------------------------- Previous Page //
function previousPage(prev: () => void): void {
	if (canReviewPreviousButtonDisabled.value) {
		return;
	}

	prev();
}

const lastPage = computed<boolean>(() => {
	return stepperModel.value === Object.keys(pages).length;
});


// TODO: This needs some more work and add a setting to not allow users to jump ahead in the questions //
function headerItemDisabled(page: Page): boolean {
	const totalSteps = Object.keys(pages).length;
	const lastStep = totalSteps - 1;

	// If you're on the last page
	if (stepperModel.value === lastStep) {
		return !page.isReview && (!settings.value.canReview) && (!page.editable && settings.value?.editable !== false);
	}

	return false;
}


// & ------------------------------------------------ Validation //
const validationSchema = computed(() => props.validationSchema);
const currentPageHasErrors = ref(false);
const errorPageIndexes: Ref<number[]> = ref<number[]>([]);

const fieldsHaveErrors = computed(() => errorPageIndexes.value.includes(stepperModel.value - 1));

// ------------------------ Run Validation //
function runValidation(
	validate: () => Promise<ValidateResult>,
	source = 'submit',
	next: () => void = () => { },
): void {
	validate()
		.then((response: ValidateResult) => {
			const errors = response.errors as unknown as ValidateResult['errors'];
			checkForPageErrors(errors, source, next);
		})
		.catch((error: Error) => {
			console.error('Error', error);
		});
}

// ------------------------ Remove error from Page //
function removePageError(pageIndex: number): void {
	if (errorPageIndexes.value.includes(pageIndex)) {
		const errPageIdx = errorPageIndexes.value.indexOf(pageIndex);

		if (errPageIdx > -1) {
			errorPageIndexes.value.splice(errPageIdx, 1);
		}
	}

	currentPageHasErrors.value = false;
}


// ------------------------ Check the if the page has errors //
function checkForPageErrors(errors: ValidateResult['errors'], source: string, next = () => { }): void {
	const currentPage = stepperModel.value - 1;
	const page = pages[currentPage];

	if (!page) {
		return;
	}

	const pageIndex = pages.findIndex((p) => p === page);
	const pageFields = page?.fields ?? [];
	const hasErrorInField = Object.keys(errors as object[]).some(errorKey => pageFields.some(field => field.name === errorKey));

	if (hasErrorInField) {
		currentPageHasErrors.value = true;

		setPageToError(pageIndex, page, source);
		return;
	}

	removePageError(pageIndex);

	if (next && !lastPage.value && source !== 'submit') {
		next();
	}
}


// ------------------------ Set Page to Errors //
function setPageToError(pageIndex: number, page?: Page, source = 'submit'): void {
	currentPageHasErrors.value = true;

	if (page && source === 'submit') {
		// eslint-disable-next-line no-param-reassign
		page.error = true;
	}

	if (!errorPageIndexes.value.includes(pageIndex)) {
		errorPageIndexes.value.push(pageIndex);
	}
}

// ------------------------ Validation callback from fields //
let debounceTimer: ReturnType<typeof setTimeout>;

function onFieldValidate(field: Field, next: () => void): void {
	const errors = parentForm.value?.errors as unknown as ValidateResult['errors'];
	const shouldAutoPage = (field.autoPage || settings.value.autoPage ? next : null) as () => void;

	// If autoPage debounce next //
	if (field?.autoPage || settings.value?.autoPage) {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			checkForPageErrors(errors, 'field', shouldAutoPage);
		}, (field?.autoPageDelay ?? settings.value?.autoPageDelay));

		return;
	}

	checkForPageErrors(errors, 'field', shouldAutoPage);
}


// -------------------------------------------------- Submit //
function onSubmit(values: any): void {
	console.log('%c%s', 'color: #00ff00; font-weight: bold;', 'onSubmit SUBMIT FORM \n', values);
	emit('submit', values);
}


// ------------------------------------------------ Callbacks //
function callbacks() {
	whenCallback();
}

// ------------------------ Conditional "when" callback //
function whenCallback(): void {
	Object.values(pages).forEach((page: Page, pageIdx: number) => {
		if (page.fields) {
			Object.values(page.fields).forEach((field: Field, fieldIdx) => {
				if (field.when) {
					const enabledField: boolean = field.when(modelValue.value);
					const indexPage = pages[pageIdx];

					if (indexPage?.fields && indexPage?.fields[fieldIdx]) {
						indexPage.fields[fieldIdx].type = enabledField ? originalPages[pageIdx].fields[fieldIdx].type : 'hidden';
					}
				}
			});
		}
	});
}


// ------------------------------------------------ Class & Styles //
// ------------------------ Classes //
const containerClasses = computed<ComputedClasses>(() => useContainerClasses({
	direction: direction.value,
}));

const stepperContainerClasses = computed<ComputedClasses>(() => useStepperContainerClasses({
	direction: direction.value,
}));

// ------------------------ Styles //
const containerStyle = computed<CSSProperties>(() => {
	const styles = {
		width: '100%',
	};

	return styles;
});

const formContainerStyle = computed<CSSProperties>(() => {
	const styles = {
		width: width.value,
	};

	return styles;
});


// -------------------------------------------------- Helpers //
function getIndex(i: number): number {
	return i + 1;
}
</script>

<style lang="scss" scoped>
.v-stepper-item--error {
	:deep(.v-icon) {
		color: #fff;
	}
}
</style>
