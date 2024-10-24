<template>
	<Field
		v-if="!field?.multiple"
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-blur="fieldValidateOn === 'blur'"
		:validate-on-change="fieldValidateOn === 'change'"
		:validate-on-input="fieldValidateOn === 'input'"
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
				:id="field?.id"
				:class="{
					'v-selection-control-group': !field.inline,
				}"
				:style="checkboxContainerStyle"
			>
				<Field
					v-slot="{ errorMessage, validate }"
					v-model="modelValue"
					:name="field.name"
					:validate-on-blur="fieldValidateOn === 'blur'"
					:validate-on-change="fieldValidateOn === 'change'"
					:validate-on-input="fieldValidateOn === 'input'"
					:validate-on-model-update="false"
				>
					<template
						v-for="option, key in field?.options"
						:key="option.value"
					>
						<v-checkbox
							v-bind="boundSettings"
							:id="option.id"
							v-model="modelValue"
							:error="errorMessage ? errorMessage?.length > 0 : false"
							:error-messages="errorMessage"
							:label="option.label"
							:style="checkboxStyle"
							:true-value="option.value"
							@blur="onActions(validate, 'blur')"
							@change="onActions(validate, 'change')"
							@input="onActions(validate, 'input')"
						>
							<template #message>
								{{ Object.keys(field?.options as KeyStringAny).length - 1 === key ? errorMessage : '' }}
							</template>
						</v-checkbox>
					</template>
				</Field>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type { VSFCheckboxProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFCheckboxProps>();

const { field, settings } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings?.validateOn);


// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidateResult, action: ValidateAction): Promise<void> {
	useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.validateOn,
		validate,
	});
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
