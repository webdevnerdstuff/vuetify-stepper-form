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
						'pb-5': !field?.hideDetails && field?.labelPositionLeft,
					}"
					:label="field.label"
					:required="fieldRequired"
				/>
			</v-label>

			<Field
				v-slot="{ errorMessage, validate }"
				v-model="modelValue"
				:name="field.name"
				:validate-on-blur="fieldValidateOn === 'blur'"
				:validate-on-change="fieldValidateOn === 'change'"
				:validate-on-input="fieldValidateOn === 'input'"
				:validate-on-model-update="false"
			>
				<div
					:id="field?.id"
					:class="{
						'v-selection-control-group': field.inline,
						'v-input--error': errorMessage ? errorMessage?.length > 0 : false,
					}"
					:style="checkboxContainerStyle"
				>
					<div :class="{
						'v-input__control': field.inline,
					}">
						<template
							v-for="option in field?.options"
							:key="option.value"
						>
							<v-checkbox
								v-bind="boundSettings"
								:id="option.id"
								v-model="modelValue"
								:error="errorMessage ? errorMessage?.length > 0 : false"
								:error-messages="errorMessage"
								:hide-details="true"
								:label="option.label"
								:style="checkboxStyle"
								:true-value="option.value"
								@blur="onActions(validate, 'blur')"
								@change="onActions(validate, 'change')"
								@input="onActions(validate, 'input')"
								@update:focused="updateFocused($event)"
							/>
						</template>
					</div>
					<div
						v-if="hasDetails"
						class="v-input__details"
					>
						<VMessages
							:active="activeMessages(errorMessage)"
							:color="errorMessage ? 'error' : undefined"
							:messages="fieldMessages(errorMessage)"
						>
						</VMessages>
					</div>
				</div>
			</Field>
		</div>
	</div>
</template>


<script lang="ts" setup>
import { VMessages } from 'vuetify/components';
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
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


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


// -------------------------------------------------- Active Messages //
const isFocused = ref(false);

function updateFocused(val: boolean): void {
	isFocused.value = val;
}

function activeMessages(errorMessage: string | string[]): boolean {
	if (errorMessage ? errorMessage.length > 0 : false) {
		return true;
	}

	if (field.hint && (field.persistentHint || isFocused.value)) {
		return true;
	}

	if (field.messages) {
		return true;
	}

	return false;
}

function fieldMessages(errorMessage) {
	if (errorMessage ? errorMessage.length > 0 : false) {
		return errorMessage;
	}

	if (field.hint && (field.persistentHint || isFocused.value)) {
		return field.hint;
	}

	if (field.messages) {
		return field.messages;
	}

	return '';
}

const hasMessages = computed(() => field.messages && field.messages.length > 0);

const hasDetails = computed(() => {
	return !bindSettings.value.hideDetails || (
		bindSettings.value.hideDetails === 'auto' && hasMessages.value
	);
});


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

// function getMessageRole(errorMessage) {
// 	if (errorMessage) {
// 		return 'alert';
// 	}

// 	return 'info';
// }
</script>

<style lang="scss" scoped></style>
