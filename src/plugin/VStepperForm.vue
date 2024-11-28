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
					data-cy="vsf-stepper-form"
					v-bind="stepperSettings"
					:mobile="sm"
					width="100%"
				>
					<template #default="{ prev, next }">
						<v-stepper-header data-cy="vsf-stepper-header">
							<template
								v-for="(page, i) in computedPages"
								:key="`${getIndex(i)}-step`"
							>
								<v-stepper-item
									:class='`vsf-activator-${componentId}-${i + 1}`'
									:color="settings.color"
									:edit-icon="page.isSummary ? '$complete' : settings.editIcon"
									:editable="headerItemEnabled(page)"
									elevation="0"
									:error="currentPageHasErrors && errorPageIndexes.includes(i)"
									:title="page.title"
									:value="getIndex(i)"
									@click="headerCheckPreviousStepValidation(i)"
								>
									<v-tooltip
										v-if="!mobile && settings.headerTooltips && page?.fields && page?.fields.length > 0"
										:activator="page.title ? 'parent' : `.vsf-activator-${componentId}-${i + 1}`"
										:location="settings.tooltipLocation"
										:offset="page.title ? settings.tooltipOffset : Number(settings.tooltipOffset) - 28"
										:transition="settings.tooltipTransition"
									>
										<div
											v-for="(field, idx) in page.fields"
											:key="idx"
										>
											{{ field.label }}
										</div>
									</v-tooltip>
								</v-stepper-item>
								<v-divider
									v-if="getIndex(i) !== Object.keys(computedPages).length"
									:key="getIndex(i)"
								></v-divider>
							</template>
						</v-stepper-header>

						<form
							ref="stepperFormRef"
							@submit="onSubmit"
						>
							<v-stepper-window>
								<v-stepper-window-item
									v-for="page, i in computedPages"
									:key="`${getIndex(i)}-content`"
									:data-cy="page.isSummary ? 'vsf-page-summary' : `vsf-page-${getIndex(i)}`"
									:reverse-transition="transitionComputed"
									:transition="transitionComputed"
									:value="getIndex(i)"
								>
									<v-container>

										<PageContainer
											v-if="!page.isSummary"
											:key="`${getIndex(i)}-page`"
											v-model="modelValue"
											:fieldColumns="settings?.fieldColumns"
											:index="getIndex(i)"
											:page="page"
											:pageIndex="getIndex(i)"
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
											:pages="computedPages"
											:settings="settings"
											:summaryColumns="settings?.summaryColumns"
											@goToQuestion="stepperModel = $event"
										/>

									</v-container>
								</v-stepper-window-item>
							</v-stepper-window>

							<v-stepper-actions v-if="!settings.hideActions">
								<template #next>
									<v-btn
										v-if="!lastPage"
										:color="settings.color"
										data-cy="vsf-next-button"
										:disabled="nextButtonDisabled"
										:size="navButtonSize"
										:variant="navButtonVariant"
										@click="runValidation('next', next)"
									/>
									<v-btn
										v-else
										:color="settings.color"
										data-cy="vsf-submit-button"
										:disabled="fieldsHaveErrors"
										:size="navButtonSize"
										type="submit"
										:variant="navButtonVariant"
										@click="onSubmit"
									>Submit</v-btn>
								</template>

								<template #prev>
									<!-- :disabled="((stepperActionsDisabled === 'prev' || settings.disabled || canReviewPreviousButtonDisabled) as boolean)" -->
									<v-btn
										data-cy="vsf-previous-button"
										:disabled="prevButtonDisabled"
										:size="navButtonSize"
										:variant="navButtonVariant"
										@click="previousPage(prev)"
									/>
								</template>
							</v-stepper-actions>
						</form>
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
import { useForm } from 'vee-validate';
import { useDisplay } from 'vuetify';
import type {
	ComputedClasses,
	Field,
	Page,
	PluginOptions,
	Props,
} from '@/plugin/types';
import type { PrivateFormContext } from 'vee-validate';
import PageContainer from './components/shared/PageContainer.vue';
import PageReviewContainer from './components/shared/PageReviewContainer.vue';
import { useBindingSettings } from './composables/bindings';
import {
	useContainerClasses,
	useStepperContainerClasses,
} from './composables/classes';
import {
	useBuildSettings,
	useColumnErrorCheck,
	useDeepMerge,
	useGetFirstAndLastEditableFalse,
} from './composables/helpers';
import {
	useHandleJumpAhead,
	useHandleNonJumpAhead,
} from './composables/navigation';
import componentEmits from './utils/emits';
import { pluginOptionsInjectionKey } from './utils/globals';
import { AllProps } from './utils/props';


const attrs = useAttrs();
const componentId = useId();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject<PluginOptions>(pluginOptionsInjectionKey)!;


// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), AllProps);
let stepperProps: Settings = reactive<Settings>(useDeepMerge(attrs, injectedOptions, props));
const { direction, jumpAhead, title, width } = toRefs(props);
const pages = reactive<Page[]>(props.pages);
const originalPages = JSON.parse(JSON.stringify(pages));

const settings: Ref<Settings> = ref<Settings>(useBuildSettings(stepperProps));

const stepperSettings = computed(() => useBindingSettings(settings.value as Partial<Settings>, [
	'autoPage',
	'autoPageDelay',
	'hideDetails',
	'keepValuesOnUnmount',
	'transition',
	'validateOn',
	'validateOnMount',
]));

watch(props, () => {
	stepperProps = useDeepMerge(attrs, injectedOptions, props);
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

const currentPageIdx = computed(() => stepperModel.value - 1);


const { mobile, sm } = useDisplay();
const transitionComputed: ComputedRef<Props['transition']> = computed(() => stepperProps.transition);
const parentForm = useTemplateRef<PrivateFormContext>('stepperFormRef');

provide('parentForm', parentForm);


// -------------------------------------------------- Stepper Action //

// ------------------------- Editable //
const stepperFormIsEditable = computed<boolean | undefined>(() => settings.value.editable);


// ------------------------- Check Disables //

const stepperActionsDisabled = computed(() => {
	return stepperModel.value === 1 ? 'prev' : stepperModel.value === Object.keys(props.pages).length ? 'next' : undefined;
});

const nextButtonDisabled = computed(() => {
	const isDisabled = ((stepperActionsDisabled.value === 'next' || settings.value.disabled) as boolean);

	return fieldsHaveErrors.value || isDisabled;
});

const prevButtonDisabled = computed(() => {
	const { lastNonEditableIndex } = useGetFirstAndLastEditableFalse(computedPages.value);

	// First Page //
	if (currentPageIdx.value === 0) {
		return true;
	}

	// Entire Stepper Form is not editable //
	if (!stepperFormIsEditable.value) {
		return true;
	}

	// If current page has errors disable //
	if (currentPageHasErrors.value) {
		return true;
	}

	if (currentPageIdx.value - 1 === lastNonEditableIndex) {
		return true;
	}

	// if (currentPage <= firstNonEditableIndex) {
	// 	return true;
	// }


	// if (stepperModel.value - 1 <= lastNonEditableIndex + 1 && lastNonEditableIndex != -1) {
	// 	return true;
	// }

	// if (lastPage.value && lastNonEditableIndex === computedPages.value.length - 2) {
	// 	return true;
	// }


	return false;
});

const canReviewPreviousButtonDisabled = computed<boolean>(() => {
	const previousPage = computedPages.value[stepperModel.value - 2];

	if (stepperFormIsEditable.value === true) {
		return false;
	}

	if (previousPage) {
		return previousPage.editable === false;
	}

	return stepperModel.value === computedPages.value.length && !props.editable;
});


// ------------------------- Previous Page //
function previousPage(prev: () => void): void {
	if (canReviewPreviousButtonDisabled.value) {
		return;
	}

	prev();
}

const lastPage = computed<boolean>(() => {
	return stepperModel.value === Object.keys(computedPages.value).length;
});


// ------------------------- Header Item Disabled //
function headerItemEnabled(page: Page): boolean {
	const { firstNonEditableIndex, lastNonEditableIndex } = useGetFirstAndLastEditableFalse(computedPages.value);
	const currentPages = computedPages.value;

	const pageIdx = currentPages.findIndex((p) => p === page);
	const pageEditable = page.editable !== false;
	const pageNotEditable = page.editable === false;
	const currentPageEditable = currentPages[currentPageIdx.value]?.editable !== false;
	// const currentPageNotEditable = currentPages[currentPageIdx.value]?.editable === false;
	const lastPageIdx = currentPages.length - 1;

	const previousPageIdx = pageIdx - 1;
	const previousPageEditable = currentPages[previousPageIdx]?.editable !== false;
	const previousPageNotEditable = currentPages[previousPageIdx]?.editable === false;

	const nextPageIdx = pageIdx + 1;
	const nextPageEditable = currentPages[nextPageIdx]?.editable !== false;
	const nextPageNotEditable = currentPages[nextPageIdx]?.editable === false;

	// const debug = true;

	// if (debug) {
	// 	console.groupCollapsed('page', page.title);
	// 	console.log('previousPageIdx\t', previousPageIdx);
	// 	console.log('currentPageIdx\t', currentPageIdx.value);
	// 	console.log('nextPageIdx\t\t', nextPageIdx);

	// 	console.log('lastPageIdx\t\t', lastPageIdx);
	// 	console.log('pageIdx\t\t\t', pageIdx);
	// 	console.log('');
	// 	console.log('pageEditable\t\t\t', pageEditable);
	// 	console.log('pageNotEditable\t\t\t', pageNotEditable);
	// 	console.log('currentPageEditable\t\t', currentPageEditable);
	// 	console.log('currentPageNotEditable\t', currentPageNotEditable);
	// 	console.log('previousPageEditable\t', previousPageEditable);
	// 	console.log('previousPageNotEditable\t', previousPageNotEditable);
	// 	console.log('nextPageEditable\t\t', nextPageEditable);
	// 	console.log('nextPageNotEditable\t\t', nextPageNotEditable);
	// 	console.log('');
	// 	console.log('getFirstAndLastEditableFalse.value\t\t', { firstNonEditableIndex, lastNonEditableIndex });
	// 	console.groupEnd();
	// 	console.log('');
	// }

	// & Always True //
	// Always set current page to editable //
	if (currentPageIdx.value === pageIdx) {
		return true;
	}

	// & Always False //
	// Entire Stepper Form is not editable //
	if (!stepperFormIsEditable.value) {
		return false;
	}

	// If current page has errors disable all //
	if (currentPageHasErrors.value) {
		return false;
	}

	// & Non Jump Ahead //
	if (!jumpAhead.value) {
		return useHandleNonJumpAhead({
			currentPageEditable,
			currentPageIdx,
			firstNonEditableIndex,
			lastNonEditableIndex,
			lastPageIdx,
			nextPageEditable,
			nextPageNotEditable,
			pageEditable,
			pageIdx,
			pageNotEditable,
		});
	}

	// & Jump Ahead //
	return useHandleJumpAhead({
		currentPageEditable,
		currentPageIdx,
		firstNonEditableIndex,
		lastNonEditableIndex,
		lastPageIdx,
		nextPageEditable,
		nextPageNotEditable,
		pageIdx,
		pageNotEditable,
		previousPageEditable,
		previousPageNotEditable,
	});
}


// & ------------------------------------------------ Validation //
const validationSchema = computed(() => props.validationSchema);
const currentPageHasErrors = ref(false);
const errorPageIndexes: Ref<number[]> = ref<number[]>([]);

const fieldsHaveErrors = computed(() => errorPageIndexes.value.includes(stepperModel.value - 1));

const $useForm = useForm({
	initialValues: modelValue.value,
	keepValuesOnUnmount: settings.value?.keepValuesOnUnmount,
	validationSchema: validationSchema.value,
	valueOnMount: settings.value?.validateOnMount,
});


// ------------------------ Run Validation //
function headerCheckPreviousStepValidation(index: number): void {
	const previousIndex = index === 0 ? 0 : index - 1;
	const previousPage = computedPages.value[previousIndex];

	if (!previousPage || !previousPage.fields) {
		return;
	}

	previousPage.fields.forEach((field) => {
		$useForm.validateField(field.name, {}, { name: field.name })
			.then((response: ValidateResult) => {
				const errors = response.errors as unknown as ValidateResult['errors'];

				if (errors.length) {
					stepperModel.value = previousIndex + 1;
					currentPageHasErrors.value = true;

					setPageToError(previousIndex, previousPage, 'submit');
					return;
				}

				removePageError(previousIndex);
			});
	});
}

function runValidation(
	source = 'submit',
	next: () => void = () => { },
): void {
	if (!parentForm.value) {
		return;
	}

	$useForm.validate()
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
	const page = computedPages.value[currentPageIdx.value];

	if (!page) {
		return;
	}

	const pageIndex = computedPages.value.findIndex((p) => p === page);
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
	const errors = $useForm.errorBag as ValidateResult['errors'];
	const shouldAutoPage = (field.autoPage || settings.value.autoPage ? next : null) as () => void;

	// If autoPage //
	if (field?.autoPage || settings.value?.autoPage) {

		if (parentForm.value) {
			// First validate the page before proceeding to the next page //
			$useForm.validate()
				.then((res: ValidateResult) => {
					if (res.valid) {
						// debounce next //
						clearTimeout(debounceTimer);
						debounceTimer = setTimeout(() => {
							checkForPageErrors(errors, 'field', shouldAutoPage);
						}, (field?.autoPageDelay ?? settings.value?.autoPageDelay));

						return;
					}

					const page = computedPages.value[currentPageIdx.value];
					const pageIndex = computedPages.value.findIndex((p) => p === page);

					setPageToError(pageIndex, page, 'validating');
				})
				.catch((error: Error) => {
					console.error('Error', error);
				});
		}

		return;
	}

	$useForm.validateField(field.name, {}, { name: field.name })
		.then(() => {
			checkForPageErrors($useForm.errorBag.value, 'field', shouldAutoPage);

		});
}


// -------------------------------------------------- Submit //
const onSubmit = $useForm.handleSubmit((values: any): void => {
	emit('submit', values);
});


// ------------------------------------------------ Callbacks //
function callbacks() {
	whenCallback();
}

// ------------------------ Conditional "when" callbacks //
const computedPages = computed<Page[]>(() => {
	// const localPages = JSON.parse(JSON.stringify(pages));
	Object.values(pages).forEach((page: Page, pageIdx: number) => {
		const localPage = page;
		localPage.visible = true;

		if (localPage.when) {
			const enabledPage: boolean = (localPage.when as (value: any) => boolean)(modelValue.value);

			if (pages[pageIdx]) {
				pages[pageIdx].visible = enabledPage;
			}
		}
	});

	return pages.filter((p: Page) => p.visible);
});

function whenCallback(): void {
	Object.values(computedPages.value).forEach((page: Page, pageIdx: number) => {
		if (page.fields) {
			Object.values(page.fields).forEach((field: Field, fieldIdx) => {
				if (field.when) {
					const enabledField: boolean = field.when(modelValue.value);
					const indexPage = computedPages.value[pageIdx];

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
