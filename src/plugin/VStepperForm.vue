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
								:key="`${i}-step`"
							>
								<v-stepper-item
									:color="settings.color"
									:disabled="headerItemDisabled(page)"
									:edit-icon="page.isReview ? '$complete' : settings.editIcon"
									:editable="page.editable"
									elevation="0"
									:title="page.title"
									:value="getIndex(i)"
								></v-stepper-item>

								<v-divider
									v-if="getIndex(i) !== Object.keys(pages).length"
									:key="getIndex(i)"
								></v-divider>
							</template>
						</v-stepper-header>

						<v-stepper-window>
							<v-stepper-window-item
								v-for="page, i in pages"
								:key="`${i}-content`"
								:reverse-transition="transition"
								:transition="transition"
								:value="getIndex(i)"
							>
								<v-container>
									<PageContainer
										v-if="!page.isReview"
										v-model="modelValue"
										:index="getIndex(i)"
										:page="page"
										:settings="settings"
										@callback="callbacks"
										@next="validatePage(next)"
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
									:color="settings.color"
									:disabled="((stepperActionsDisabled === 'next' || settings.disabled) as boolean)"
									:size="navButtonSize"
									@click="validatePage(next)"
								/>
							</template>

							<template #prev>
								<v-btn
									:disabled="((stepperActionsDisabled === 'prev' || settings.disabled || canReviewPreviousButtonDisabled) as boolean)"
									:size="navButtonSize"
									@click="previousPage(prev)"
								/>
							</template>
						</v-stepper-actions>
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
import {
	Field,
	Page,
	Props,
	Settings,
	SummaryColumns,
} from '@/plugin/types';
import {
	useContainerClasses,
	useStepperContainerClasses,
} from './composables/classes';
import componentEmits from './utils/emits';
import { globalOptions } from './';
import PageContainer from './components/shared/PageContainer.vue';
import PageReviewContainer from './components/shared/PageReviewContainer.vue';
import { useMergeProps } from './composables/helpers';
import { watchDeep } from '@vueuse/core';


const attrs = useAttrs();
// const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});


// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), AllProps);

const stepperProps = reactive<Settings>(useMergeProps(attrs, injectedOptions, props));
const { direction, pages, title, width } = toRefs(props);
const originalPages = JSON.parse(JSON.stringify(pages.value));

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


// const StepperComponent = markRaw(props.direction === 'vertical' ? VStepperVertical : VStepper);
// console.log('StepperComponent', StepperComponent);


// -------------------------------------------------- Mounted //
onMounted(() => {
	whenCallback();

	summaryColumnErrorCheck();
});


// -------------------------------------------------- Data //
const modelValue = defineModel<any>();

watchDeep(modelValue, () => {
	callbacks();
});

const stepperModel = ref(1);

watch(stepperModel, () => {
	if (stepperModel.value === pages.value.length) {
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

// TODO: Make this disabled if the previous page is not editable //
const canReviewPreviousButtonDisabled = computed(() => {
	// console.log('canReviewPreviousButtonDisabled');

	return stepperModel.value === pages.value.length && !props.canReview;
});

// const previousButtonDisabled = computed(() => {
// 	return stepperModel.value === 1;
// });

// console.log('previousButtonDisabled', previousButtonDisabled.value);

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


// ------------------------------------------------ Callback & Validation //
// const pagesValidation = ref((pages.value)
// 	.map((_, i) => ({ page: i + 1, valid: false })));

// console.log('pagesValidation', pagesValidation.value);

function validatePage(event: () => void): void {
	console.log('validatePage', event);

	console.log('stepperModel', stepperModel.value);
	nextPage(event);
}




function callbacks() {
	whenCallback();
}





function whenCallback() {
	Object.values(pages.value).forEach((page: Page, pageIdx: number) => {
		Object.values(page.fields as Field[]).forEach((field: Field, fieldIdx) => {
			if (field.when) {
				const enabledField: boolean = field.when(modelValue.value);
				const indexPage = pages.value[pageIdx];

				if (indexPage?.fields[fieldIdx]) {
					indexPage.fields[fieldIdx].type = enabledField ? originalPages[pageIdx].fields[fieldIdx].type : 'hidden';

					// TODO: Update validation //
				}
			}
		});
	});
}


// ------------------------------------------------ Submit Form //
function submitForm() {
	console.log('VStepperForm submitForm');
	emit('submit');
}


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
