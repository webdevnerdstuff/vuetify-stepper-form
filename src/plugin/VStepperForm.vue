<template>
	<div
		:class="containerClasses"
		:style="containerStyle"
	>
		<div :style="formContainerStyle">
			<v-container fluid>
				<v-row v-if="title">
					<v-col>
						<h2>
							{{ title }} {{ formCompleted }}
						</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						stepperMode: {{ stepperModel }}
						<br />
						currentPageHasErrors: {{ currentPageHasErrors }}
						<br />
						errorPageIndexes: {{ errorPageIndexes }}
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

						<form @submit.prevent="onSubmit">
							<v-stepper-window>
								<v-stepper-window-item
									v-for="page, i in pages"
									:key="`${getIndex(i)}-content`"
									:reverse-transition="transition"
									:transition="transition"
									:value="getIndex(i)"
								>
									<v-container>
										<PageContainer
											v-if="!page.isReview"
											:key="`${getIndex(i)}-page`"
											v-model="modelValue"
											:index="getIndex(i)"
											:page="page"
											:settings="settings"
											:validateSchema="validateSchema"
											@next="validatePage(next)"
											@validate="onValidate($event, next)"
										/>
										<PageReviewContainer
											v-else
											v-model="modelValue"
											:page="page"
											:pages="pages"
											:settings="settings"
											:summary-columns="summaryColumns"
											@goToQuestion="stepperModel = $event"
											@submit="submitForm"
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
										@click="validatePage(next)"
									/>
									<v-btn
										:color="settings.color"
										:disabled="fieldsHaveErrors && errorPageIndexes.includes(stepperModel - 1)"
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

							<v-row>
								<v-col>
								</v-col>
							</v-row>
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
import { AllProps } from './utils/props';
import { useDisplay } from 'vuetify';
import type {
	EmitValidateEventPayload,
	Field,
	Page,
	Props,
	SchemaField,
	Settings,
	SummaryColumns,
} from '@/plugin/types';
import {
	useContainerClasses,
	useStepperContainerClasses,
} from './composables/classes';
import componentEmits from './utils/emits';
import { TriggerValidationBus } from './utils/globals';
import { globalOptions } from './';
import PageContainer from './components/shared/PageContainer.vue';
import PageReviewContainer from './components/shared/PageReviewContainer.vue';
import { useMergeProps } from './composables/helpers';
import {
	useEventBus,
	watchDeep,
} from '@vueuse/core';
import {
	useGetValidationSchema,
} from './composables/validation';


const attrs = useAttrs();
// const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});


// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), AllProps);

const stepperProps = reactive<Settings>(useMergeProps(attrs, injectedOptions, props));
const { direction, title, width } = toRefs(props);
const pages = reactive(props.pages);
const originalPages = JSON.parse(JSON.stringify(pages));

const settings = ref<Settings>({
	altLabels: stepperProps.altLabels,
	autoPage: stepperProps.autoPage,
	autoPageDelay: stepperProps.autoPageDelay,
	bgColor: stepperProps.bgColor,
	border: stepperProps.border,
	canReview: stepperProps.canReview,
	color: stepperProps.color || 'primary',
	density: stepperProps.density,
	disabled: stepperProps.disabled,
	editIcon: stepperProps.editIcon,
	editable: stepperProps.editable,
	elevation: stepperProps.elevation,
	flat: stepperProps.flat,
	height: stepperProps.height,
	hideActions: stepperProps.hideActions,
	hideDetails: stepperProps.hideDetails,
	maxHeight: stepperProps.maxHeight,
	maxWidth: stepperProps.maxWidth,
	minHeight: stepperProps.minHeight,
	minWidth: stepperProps.minWidth,
	nextText: stepperProps.nextText,
	prevText: stepperProps.prevText,
	rounded: stepperProps.rounded,
	selectedClass: stepperProps.selectedClass,
	theme: stepperProps.theme,
	tile: stepperProps.tile,
	transition: stepperProps.transition,
	validateOn: stepperProps.validateOn,
	variant: stepperProps.variant,
});

// console.log('stepperProps', stepperProps);
console.log('settings.value', settings.value);


const allFieldsArray = ref<Field[]>([]);

Object.values(pages).forEach((p: Page) => {
	Object.values(p.fields).forEach((field: Field) => {
		allFieldsArray.value.push(field as Field);
	});
});


// const StepperComponent = markRaw(props.direction === 'vertical' ? VStepperVertical : VStepper);
// console.log('StepperComponent', StepperComponent);


// -------------------------------------------------- Mounted //
onMounted(() => {
	whenCallback();

	// useSetupValidation({
	// 	fields: allFieldsArray.value,
	// });

	summaryColumnErrorCheck();
});


// -------------------------------------------------- Data //
const modelValue = defineModel<any>();

watchDeep(modelValue, () => {
	callbacks();
});

const stepperModel = ref(1);

watch(stepperModel, () => {
	if (stepperModel.value === pages.length) {
		formCompleted.value = true;
	}
});

const { sm } = useDisplay();
const transition = computed(() => stepperProps.transition);
const formCompleted = ref(false);


// -------------------------------------------------- Stepper Action //
const stepperActionsDisabled = computed(() => {
	return stepperModel.value === 1 ? 'prev' : stepperModel.value === Object.keys(props.pages).length ? 'next' : undefined;
});

const nextButtonDisabled = computed(() => {
	const foo = ((stepperActionsDisabled.value === 'next' || settings.value.disabled) as boolean);

	const currentPageHasError = errorPageIndexes.value.includes(stepperModel.value - 1);

	return currentPageHasError || foo;
});

// TODO: Make this disabled if the previous page is not editable //
const canReviewPreviousButtonDisabled = computed(() => {
	return stepperModel.value === pages.length && !props.canReview;
});

function nextPage(next: () => void): void {
	console.log('nextPage', next);

	next();
}

function previousPage(prev: () => void): void {
	// console.log('previousPage', prev);

	if (canReviewPreviousButtonDisabled.value) {
		return;
	}

	prev();
}

const lastPage = computed(() => {
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
const validateSchema = useGetValidationSchema(allFieldsArray.value as SchemaField[]);
const fieldsHaveErrors = ref(false);
let triggerValidationBus: unknown | any;

onMounted(() => {
	triggerValidationBus = useEventBus<string>(TriggerValidationBus);
});


const currentPageHasErrors = ref(false);
const errorPageIndexes = ref<number[]>([]);


function setPageToError(pageIndex: EmitValidateEventPayload['pageIndex'], page?: Page): void {
	currentPageHasErrors.value = true;

	if (page) {
		// eslint-disable-next-line no-param-reassign
		page.error = true;
	}

	if (!errorPageIndexes.value.includes(pageIndex)) {
		errorPageIndexes.value.push(pageIndex);
	}
}


function onValidate(payload: EmitValidateEventPayload, event: () => void) {
	// console.group('onValidate');
	// console.log('payload', payload);

	const page = pages[payload.pageIndex];

	// console.log('page', page);

	if (!page) {
		return;
	}

	const currentFieldIndex = page.fields.findIndex((f) => f.name === payload.fieldName);

	// Do not continue if field is not the last field //
	if (currentFieldIndex !== page.fields.length - 1) {
		return;
	}

	let fieldsError = false;

	Object.values(page.fields).forEach((field: Field) => {
		if (field.error === true || !Object.prototype.hasOwnProperty.call(field, 'error')) {
			fieldsError = true;
		}
	});


	if (fieldsError) {
		// page.error = payload.error;
		setPageToError(payload.pageIndex);
		return;
	}

	if (payload.action === 'page') {
		page.error = payload.error === true;

		if (page.error) {
			setPageToError(payload.pageIndex, page);

			// console.groupEnd();
			return;
		}

		currentPageHasErrors.value = false;
	}

	const index = errorPageIndexes.value.indexOf(payload.pageIndex);

	if (index > -1) {
		errorPageIndexes.value.splice(index, 1);
	}


	// debugger;

	// const field = page.fields.find((f) => f.name === payload.fieldName);

	if (fieldsError) {
		// console.log('XXXX fieldsError', fieldsError);
		// console.groupEnd();
		return;
	}

	currentPageHasErrors.value = false;

	if (payload.nextPage && stepperModel.value === payload.pageIndex + 1) {
		nextPage(event);
	}

	// console.groupEnd();
}


function validatePage(event: () => void): void {
	console.log('validatePage', event);

	triggerValidationBus.emit({
		pageIndex: stepperModel.value,
	});
}

// ------------------------------------------------ Callbacks //
function callbacks() {
	whenCallback();
}


// ------------------------ Conditional "when" callback //
function whenCallback() {
	Object.values(pages).forEach((page: Page, pageIdx: number) => {
		Object.values(page.fields as Field[]).forEach((field: Field, fieldIdx) => {
			if (field.when) {
				const enabledField: boolean = field.when(modelValue.value);
				const indexPage = pages[pageIdx];

				if (indexPage?.fields[fieldIdx]) {
					indexPage.fields[fieldIdx].type = enabledField ? originalPages[pageIdx].fields[fieldIdx].type : 'hidden';

					// TODO: Update validation //
				}
			}
		});
	});
}


// -------------------------------------------------- Submit //
function onSubmit(val) {
	// checkForPageErrors();

	console.log('onSubmit', val);
	if (fieldsHaveErrors.value) {
		return;
	}
	// useValidation({
	// 	fields: allFieldsArray.value,
	// });
}


function submitForm() {
	// console.log('VStepperForm submitForm');
	emit('submit');
};


// ------------------------------------------------ Class & Styles //
const containerClasses = computed(() => useContainerClasses({
	direction: direction.value,
}));

const stepperContainerClasses = computed(() => useStepperContainerClasses({
	direction: direction.value,
}));

const containerStyle = computed<CSSProperties>(() => {
	const styles = {
		width: '100%'
	};

	return styles;
});

const formContainerStyle = computed<CSSProperties>(() => {
	const styles = {
		width: width.value
	};

	return styles;
});


// -------------------------------------------------- Helpers //
function getIndex(i: number): number {
	return i + 1;
}


// ------------------------------------------------ Error Checking //
function summaryColumnErrorCheck(): void {
	let err = false;

	if (!props.summaryColumns) {
		return;
	}

	Object.values(props.summaryColumns as SummaryColumns).forEach((column) => {
		if (column < 1 || column > 12) {
			err = true;
		}
	});

	if (!err) {
		return;
	}

	throw new Error('Summary column values must be between 1 and 12');
}
</script>

<style lang="scss" scoped></style>
