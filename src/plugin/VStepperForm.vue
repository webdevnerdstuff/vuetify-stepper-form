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
									:title="`${page.title} ${page.editable !== false}`"
									:value="getIndex(i)"
								>
									<v-tooltip
										v-if="!mobile && settings.headerTooltips && page?.fields && (page?.fields as Field[]).length > 0"
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
										data-cy="vsf-next-button"
										:disabled="nextButtonDisabled"
										:size="navButtonSize"
										:variant="navButtonVariant"
										@click="runValidation(validate, 'next', next)"
									/>
									<v-btn
										v-else
										:color="settings.color"
										data-cy="vsf-submit-button"
										:disabled="fieldsHaveErrors"
										:size="navButtonSize"
										type="submit"
										:variant="navButtonVariant"
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
import componentEmits from './utils/emits';
import { AllProps } from './utils/props';


const attrs = useAttrs();
const componentId = useId();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject<Ref<Settings>>('globalOptions')!;

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
	const currentPage = stepperModel.value - 1;
	const { firstNonEditableIndex, lastNonEditableIndex } = useGetFirstAndLastEditableFalse(computedPages.value);
	// console.log('currentPage', currentPage);
	// console.log('firstNonEditableIndex', firstNonEditableIndex);
	// console.log('lastNonEditableIndex', lastNonEditableIndex);
	// console.log('isSummary', computedPages.value[currentPage]?.isSummary);

	// First Page //
	if (currentPage === 0) {
		// console.log('FIRST PAGE');
		return true;
	}

	// Entire Stepper Form is not editable //
	if (!stepperFormIsEditable.value) {
		// console.log('NOT EDITABLE');
		return true;
	}

	// If current page has errors disable //
	if (currentPageHasErrors.value) {
		// console.log('HAS ERRORS');
		return true;
	}

	if (currentPage - 1 === lastNonEditableIndex) {
		// console.log('LAST NON EDITABLE');
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
	const currentPageIdx = stepperModel.value - 1;
	const currentPageEditable = currentPages[currentPageIdx]?.editable !== false;
	// const currentPageNotEditable = currentPages[currentPageIdx]?.editable === false;
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
	// 	console.log('currentPageIdx\t', currentPageIdx);
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

	// & -------------------------------------------------- Always True //
	// Always set current page to editable //
	if (currentPageIdx === pageIdx) {
		return true;
	}

	// & -------------------------------------------------- Always False //
	// Entire Stepper Form is not editable //
	if (!stepperFormIsEditable.value) {
		return false;
	}

	// If current page has errors disable all //
	if (currentPageHasErrors.value) {
		return false;
	}

	// & -------------------------------------------------- Non Jump Ahead //
	// If not allowed to jump ahead //
	if (!jumpAhead.value) {

		// If page is before the current page //
		if (pageIdx < currentPageIdx) {

			// If the current page is before the last non editable page //
			if (currentPageIdx > lastNonEditableIndex) {

				/**
				 * If the page is before the first non editable page
				 * And the page is before the last non editable page
				 * And the current page is the last page
				 * And the page is editable
				 */
				if (
					pageIdx > firstNonEditableIndex &&
					pageIdx > lastNonEditableIndex &&
					currentPageIdx === lastPageIdx &&
					pageEditable
				) {
					// console.log('d', page.title, pageIdx, currentPageIdx);
					return true;
				}

				// If the page is not editable //
				if (!pageEditable) {
					// console.log('aa', page.title, pageIdx, currentPageIdx);
					return false;
				}
			}

			/**
			 * If the page is before the first non editable page
			 * And the current page is before or equal to the first non editable page
			 */
			if (pageIdx < firstNonEditableIndex && currentPageIdx <= firstNonEditableIndex) {
				// console.log('ab', page.title, pageIdx, currentPageIdx);
				return true;
			}
		}

		/**
		 * If the page is before or equal to the first non editable page
		 * And the current page is editable
		 */
		if (pageIdx <= firstNonEditableIndex && currentPageEditable) {
			// console.log('ac', page.title, pageIdx, currentPageIdx);
			return false;
		}

		// If the page is before the current page //
		if (pageIdx < currentPageIdx) {

			/**
			 * If the page is after the first non editable page
			 * And the page is before the last non editable page
			 * And the current page is before or equal to the last non editable page
			 * And the next page is not editable
			 * And the page is editable
			 */
			if (
				pageIdx > firstNonEditableIndex &&
				pageIdx < lastNonEditableIndex &&
				currentPageIdx <= lastNonEditableIndex &&
				nextPageNotEditable &&
				pageEditable
			) {
				// console.log('ad', page.title, pageIdx, currentPageIdx);
				return true;
			}

			/**
			 * If the page is before the last non editable page
			 * And the page is not editable
			 */
			if (pageIdx < lastNonEditableIndex && pageNotEditable) {
				// console.log('ae', page.title, pageIdx, currentPageIdx);
				return false;
			}

			/**
			 * If the page is before the first non editable page
			 * And the next page is editable
			 * And the current page is not the last page
			 */
			if (
				pageIdx > firstNonEditableIndex &&
				nextPageEditable &&
				currentPageIdx !== lastPageIdx
			) {
				// console.log('af', page.title, pageIdx, currentPageIdx);
				return true;
			}
		}

		return false;
	}

	// & -------------------------------------------------- Jump Ahead //
	// If the page is before the last non editable page //
	if (pageIdx > lastNonEditableIndex) {

		// If the current page is after the last non editable page //
		if (currentPageIdx > lastNonEditableIndex) {
			// console.log('f1', page.title, pageIdx, currentPageIdx);
			return true;
		}

		// console.log('f', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is equal to the last non editable page //
	if (pageIdx === lastNonEditableIndex) {
		// console.log('g', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is before the last non editable page //
	if (pageIdx < lastNonEditableIndex) {

		// If the current page is equal to the last page //
		if (currentPageIdx === lastPageIdx) {
			return false;
		}

		// If the current page is after the first non editable page //
		if (pageIdx > firstNonEditableIndex) {

			// If the current page is editable and the next page is editable //
			if (currentPageEditable && nextPageEditable) {
				// console.log('j-3', page.title, pageIdx, currentPageIdx);
				return true;
			}

			/**
			 * If the current page is editable
			 * And the next page is not editable
			 * And the page is after the first non editable page
			 * And the page is after the current page
			 */
			if (
				currentPageEditable &&
				nextPageNotEditable &&
				pageIdx > firstNonEditableIndex &&
				currentPageIdx > firstNonEditableIndex &&
				pageIdx > currentPageIdx
			) {
				// console.log('j-3-1', page.title, pageIdx, currentPageIdx);
				return true;
			}

			// console.log('j-4', page.title, pageIdx, currentPageIdx);
			return false;
		}
	}

	// If the page is after than the first non editable page //
	if (pageIdx > firstNonEditableIndex) {

		// If the current page is before or equal to the first non editable page //
		if (currentPageIdx <= firstNonEditableIndex) {
			// console.log('e-2', page.title, pageIdx, currentPageIdx);
			return false;
		}

		// console.log('e', page.title, pageIdx, currentPageIdx);
		return true;
	}

	/**
	 * If the page is before the first non editable page
	 * And the current page is before or equal to the first non editable page
	 */
	if (pageIdx < firstNonEditableIndex && currentPageIdx <= firstNonEditableIndex) {
		// console.log('e-3', page.title, pageIdx, currentPageIdx);
		return true;
	}

	/**
	 * If the current page is before the page
	 * And the page is before or equal to the first non editable page
	 */
	if (currentPageIdx > pageIdx && pageIdx <= firstNonEditableIndex) {
		// console.log('e-4', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the page is before the current page //
	if (pageIdx < currentPageIdx) {
		// console.log('h', page.title, pageIdx, currentPageIdx);
		return true;
	}

	// If the page is not editable //
	if (pageNotEditable) {
		// console.log('i', page.title, pageIdx, currentPageIdx);
		return false;
	}

	// If the current page is before or equal to the page //
	if (currentPageIdx <= pageIdx) {

		// If the page is before the first non editable page //
		if (pageIdx < firstNonEditableIndex) {
			return false;
		}

		return true;
	}

	/**
	 * If the current page is after the page
	 * And the previous page is editable
	 */
	if (currentPageIdx >= pageIdx && previousPageEditable) {
		// console.log('currentPageIdx >= pageIdx', page.title, pageIdx, currentPageIdx);
		return true;
	}

	// If the next or previous page is not editable //
	if (nextPageNotEditable || previousPageNotEditable) {
		return false;
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
	const page = computedPages.value[currentPage];

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
	const errors = parentForm.value?.errors as ValidateResult['errors'];
	const shouldAutoPage = (field.autoPage || settings.value.autoPage ? next : null) as () => void;

	// If autoPage //
	if (field?.autoPage || settings.value?.autoPage) {

		if (parentForm.value) {
			// First validate the page before proceeding to the next page //
			(parentForm.value as { validate: () => Promise<ValidateResult>; }).validate()
				.then((res: ValidateResult) => {
					if (res.valid) {
						// debounce next //
						clearTimeout(debounceTimer);
						debounceTimer = setTimeout(() => {
							checkForPageErrors(errors, 'field', shouldAutoPage);
						}, (field?.autoPageDelay ?? settings.value?.autoPageDelay));

						return;
					}

					const currentPage = stepperModel.value - 1;
					const page = computedPages.value[currentPage];
					const pageIndex = computedPages.value.findIndex((p) => p === page);

					setPageToError(pageIndex, page, 'validating');
				})
				.catch((error: Error) => {
					console.error('Error', error);
				});
		}

		return;
	}

	checkForPageErrors(errors, 'field', shouldAutoPage);
}


// -------------------------------------------------- Submit //
function onSubmit(values: any): void {
	emit('submit', values);
}


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
