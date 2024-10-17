<template>
	<Form
		:ref="formFieldRef"
		:validation-schema="validateSchema"
	>
		<div :style="fieldContainerStyle">
			<div
				class="v-input__control"
				:style="inputControlContainerStyle"
			>
				<v-label
					v-if="field.label"
					:class="{
						'me-2': field.labelPositionLeft,
					}"
				>
					<FieldLabel
						:class="{
							'pb-5': field.labelPositionLeft,
						}"
						:label="field.label"
						:required="fieldRequired"
					/>
				</v-label>

				<div :style="checkboxContainerStyle">
					<v-radio-group
						v-model="modelValue"
						:append-icon="field?.appendIcon"
						:error="hasErrors"
						:error-messages="field?.errorMessages"
						:inline="field?.inline"
						:max-errors="field?.maxErrors"
						:max-width="field?.maxWidth"
						:messages="field?.messages"
						:min-width="field?.minWidth"
						:prepend-icon="field?.prependIcon"
						:theme="field?.theme"
						:width="field?.width"
					>
						<Field
							v-for="option in field?.options"
							:key="option.value"
							v-slot="{ errorMessage }"
							v-model="modelValue"
							:name="field.name"
							type="radio"
							:validate-on-model-update="true"
						>
							<v-radio
								v-bind="boundSettings"
								:error="errorMessage ? errorMessage?.length > 0 : false"
								:error-messages="errorMessage"
								:label="option.label"
								:style="radioStyle"
								:value="option.value"
								@blur="onActions('blur')"
								@change="onActions('change')"
								@input="onActions('input')"
							>
							</v-radio>
						</Field>
					</v-radio-group>
				</div>
			</div>
		</div>
	</Form>
</template>


<script lang="ts" setup>
import { TriggerValidationBus } from '../../../utils/globals';
import type {
	TriggerValidation,
	UseOnActionsResponse,
	ValidateAction,
} from '../../../types';
import type {
	VSFRadioProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';
import { useOnActions } from '../../../composables/validation';
import { Field, Form } from 'vee-validate';
import type { PrivateFormContext } from 'vee-validate';
import { useEventBus } from '@vueuse/core';


const emit = defineEmits([
	'next',
	'validate',
]);
const modelValue = defineModel<any>();
const props = defineProps<VSFRadioProps>();

const { field, pageIndex, settings, validateSchema } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });


// -------------------------------------------------- Validation //
const formFieldRef = `${Math.ceil(Math.random() * 1000)}-formFieldRef`;
const localForm = useTemplateRef<PrivateFormContext>(String(formFieldRef));


// ------------------------- Validate On Actions //
async function onActions(action: ValidateAction): Promise<UseOnActionsResponse | void> {
	let shouldValidate = false;

	const response = await useOnActions({
		action,
		emit,
		field: field,
		localForm: localForm.value,
		pageIndex,
		validateOn: field.validateOn || settings?.validateOn,
	})
		.then((response) => {
			shouldValidate = response.shouldValidate;
			return response;
		});

	if (!shouldValidate) {
		return;
	}

	return response;
}


// ------------------------- Bus Event //
const triggerValidationBus = useEventBus<TriggerValidation>(TriggerValidationBus);

function validationListener(data: any): void {
	if (data.pageIndex === pageIndex && field.type !== 'hidden' && field.type != null) {
		onActions(data.action);
	}
}

// Listen to an event //
const unsubscribeBus = triggerValidationBus.on(validationListener);

// Unsubscribe on unmount //
onUnmounted(() => {
	if (typeof unsubscribeBus !== 'undefined') {
		triggerValidationBus.off(validationListener);
	}
});


const hasErrors = computed(() => {
	let err = field?.error;

	err = field?.errorMessages ? field.errorMessages.length > 0 : err;

	return err;
});

// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	falseValue: field.falseValue || undefined,
	hideDetails: field.hideDetails || settings?.hideDetails,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));


// Styles //
const fieldContainerStyle = computed<CSSProperties>(() => {
	const styles = {
		'width': field?.minWidth ?? field?.width ?? undefined,
	};

	return styles as CSSProperties;
});

const inputControlContainerStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.labelPositionLeft;

	const styles = {
		'flex-direction': useInlineSpacing ? 'row' : 'column',
	};

	return styles as CSSProperties;
});


// Inline Checkboxes //
const checkboxContainerStyle = computed<CSSProperties>(() => ({
	'display': field.inline ? 'flex' : undefined,
}));

const radioStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.inline && field.inlineSpacing;
	const marginRight = '10px';

	const styles = {
		'margin-right': useInlineSpacing ? field.inlineSpacing : marginRight,
	};

	return styles as CSSProperties;
});


</script>

<style lang="scss" scoped></style>
