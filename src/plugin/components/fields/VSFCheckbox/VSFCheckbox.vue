<template>
	<Field
		v-if="!field?.multiple"
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-model-update="false"
	>
		<v-checkbox
			v-model="modelValue"
			v-bind="boundSettings"
			:error="errorMessage ? errorMessage?.length > 0 : false"
			:error-messages="errorMessage"
			@blur="onActions(validate, 'blur')"
			@change="onActions(validate, 'change')"
			@input="onActions(validate, 'input')"
		>
			<template #label>
				<FieldLabel
					:label="field.label"
					:required="fieldRequired"
				/>
			</template>
		</v-checkbox>
	</Field>

	<div
		v-else
		class="v-input v-input--horizontal v-input--center-affix"
	>
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
						'pb-5': !field?.hideDetails,
					}"
					:label="field.label"
					:required="fieldRequired"
				/>
			</v-label>

			<div
				:class="{
					'v-selection-control-group': !field.inline,
				}"
				:style="checkboxContainerStyle"
			>
				<Field
					v-for="option in field?.options"
					:key="option.value"
					v-slot="{ errorMessage, validate }"
					v-model="modelValue"
					:name="field.name"
					:validate-on-model-update="false"
				>
					<v-checkbox
						v-model="modelValue"
						v-bind="boundSettings"
						:error="errorMessage ? errorMessage?.length > 0 : false"
						:error-messages="errorMessage"
						:label="option.label"
						:style="checkboxStyle"
						:true-value="option.value"
						@blur="onActions(validate, 'blur')"
						@change="onActions(validate, 'change')"
						@input="onActions(validate, 'input')"
					>
					</v-checkbox>
				</Field>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type { VSFCheckboxProps } from './index';
import type { FieldValidator } from 'vee-validate';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits([
	'next',
	'validate',
]);
const modelValue = defineModel<any>();
const props = defineProps<VSFCheckboxProps>();

const { field, settings } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});


// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidator<unknown>, action: string): Promise<void> {
	const validateOn = field.validateOn || settings.validateOn;
	const isBlur = action === 'blur' && validateOn === 'blur';
	const isInput = action === 'input' && validateOn === 'input';
	const isChange = action === 'change' && validateOn === 'change';

	if (isBlur || isInput || isChange) {
		validate()
			.then(() => {
				emit('validate', field);
			});
	}
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	falseValue: field.falseValue || undefined,
	hideDetails: field.hideDetails || settings?.hideDetails,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));


// -------------------------------------------------- Styles //
const inputControlContainerStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.labelPositionLeft;

	const styles = {
		'flex-direction': useInlineSpacing ? 'row' : 'column',
	};

	return styles as CSSProperties;
});


// -------------------------------------------------- Inline Checkboxes //
const checkboxContainerStyle = computed<CSSProperties>(() => ({
	'display': field.inline ? 'flex' : undefined,
}));

const checkboxStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.inline && field.inlineSpacing;
	const marginRight = '10px';

	const styles = {
		'margin-right': useInlineSpacing ? field.inlineSpacing : marginRight,
	};

	return styles as CSSProperties;
});
</script>

<style lang="scss" scoped></style>
