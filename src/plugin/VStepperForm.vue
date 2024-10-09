<template>
	<div
		class="d-flex flex-column justify-center align-center"
		:class="containerClasses"
		:style="containerStyle"
	>
		<div :style="formStyle">
			<v-container fluid>
				<v-row v-if="title">
					<v-col>
						<h2>
							{{ title }}
						</h2>
					</v-col>
				</v-row>
			</v-container>

			<v-container
				class="d-flex flex-column justify-center align-center"
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
								<!-- TODO: Make these disabled if last page and canReview is false -->
								<v-stepper-item
									:color="settings.color"
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
									/>
									<PageReviewContainer
										v-else
										v-model="modelValue"
										:canReview="canReview"
										:page="page"
										:pages="pages"
										:settings="settings"
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
									@click="validatePage(next)"
								/>
							</template>

							<template #prev>
								<v-btn
									:disabled="((stepperActionsDisabled === 'prev' || settings.disabled || canReviewPreviousButtonDisabled) as boolean)"
									@click="goToPreviousPage(prev)"
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
import {
	VStepper,
} from 'vuetify/components';
import { VStepperVertical } from 'vuetify/labs/VStepperVertical';
import { AllProps } from './utils/props';
import { useDisplay } from 'vuetify';
import {
	Props,
	Settings,
} from '@/plugin/types';
import {
	useContainerClasses,
} from './composables/classes';
import componentEmits from './utils/emits';
import { globalOptions } from './';
// import { watchDeep } from '@vueuse/core';
import PageContainer from './components/shared/PageContainer.vue';
import PageReviewContainer from './components/shared/PageReviewContainer.vue';



const attrs = useAttrs();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});

// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), { ...AllProps });
// console.log('props', props);


const stepperProps = reactive({ ...attrs, ...injectedOptions, ...props });
const { pages, title, width } = toRefs(props);



const StepperComponent = markRaw(props.direction === 'vertical' ? VStepperVertical : VStepper);

console.log('StepperComponent', StepperComponent);


const settings = ref<Settings>({
	altLabels: stepperProps.altLabels,
	bgColor: stepperProps.bgColor,
	border: stepperProps.border,
	color: stepperProps.color,
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

const { sm } = useDisplay();
const transition = computed(() => stepperProps.transition);



// const pagesValidation = ref((pages.value)
// 	.map((_, i) => ({ page: i + 1, valid: false })));

// console.log('pagesValidation', pagesValidation.value);



function validatePage(event: () => void): void {
	console.log('validatePage', event);

	console.log('stepperModel', stepperModel.value);
	nextPage(event);
}

function nextPage(next: () => void): void {
	console.log('nextPage', next);
	next();
}


// -------------------------------------------------- Data #
const modelValue = defineModel<any>();

const stepperModel = ref(1);

const stepperActionsDisabled = computed(() => {
	return stepperModel.value === 1 ? 'prev' : stepperModel.value === Object.keys(props.pages).length ? 'next' : undefined;
});

// TODO: Make this disabled if the page is not editable //
const canReviewPreviousButtonDisabled = computed(() => {
	console.log('canReviewPreviousButtonDisabled');

	return stepperModel.value === pages.value.length && !props.canReview;
});


const previousButtonDisabled = computed(() => {
	return stepperModel.value === 1;
});

console.log('previousButtonDisabled', previousButtonDisabled.value);


// watch(() => stepperModel.value, () => {
// 	console.log('canReviewPreviousButtonDisabled', canReviewPreviousButtonDisabled.value);
// 	console.group('stepperModel');
// 	console.log('stepperModel.value', stepperModel.value);
// 	console.log('pages.value.length ', pages.value.length);
// 	console.log(stepperModel.value === pages.value.length && !props.canReview);
// 	console.groupEnd();
// 	canReviewPreviousButtonDisabled.value = stepperModel.value === pages.value.length && !props.canReview;
// });


function goToPreviousPage(prev: () => void): void {
	console.log('goToPreviousPage', prev);

	if (canReviewPreviousButtonDisabled.value) {
		return;
	}

	prev();
}


// onMounted(() => {
// 	callback();
// });


function getIndex(i: number): number {
	return i + 1;
}

function submitForm() {
	console.log('VStepperForm submitForm');
	emit('submit');
}


// watch(() => fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// }), {
// 	deep: true,
// };

// watchDeep(fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// });


// function callback() {
// 	Object.values(fields.value).forEach((field) => {
// 		if (field.when) {
// 			const response = field.when(modelValue.value);
// 			const fieldIdx = fields.value.findIndex((f) => f.name === field.name);

// 			if (fields.value[fieldIdx]) {
// 				fields.value[fieldIdx].disabled = response;
// 			}
// 		}
// 	});
// }

console.log({
	emit,
	modelValue,
	props,
	slots,
	stepperProps,
});

// ------------------------------------------------ Class & Styles //
const containerClasses = computed(() => useContainerClasses({
	isOption: true,
}));

const containerStyle = computed(() => {
	const styles = {
		width: '100%'
	};

	return styles;
});

const formStyle = computed(() => {
	const styles = {
		width: width.value
	};

	return styles;
});
</script>

<style lang="scss" scoped></style>
