<template>
	<v-checkbox
		v-if="!field?.multiple"
		v-model="value"
		v-bind="{ ...(boundSettings as Omit<Settings, 'validateOn'>) }"
		:data-cy="`vsf-field-${field.name}`"
		:density="fieldDensity"
		:disabled="isValidating"
		:error="errorMessage ? errorMessage?.length > 0 : false"
		:error-messages="errorMessage"
		@blur="onActions('blur')"
		@change="onActions('change')"
		@click="fieldValidateOn === 'blur' || fieldValidateOn === 'change' ? onActions('click') : undefined"
		@input="onActions('input')"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="fieldRequired"
			/>
		</template>
	</v-checkbox>

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

			<div
				:id="field?.id"
				:class="controlGroupClasses"
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
							v-bind="{ ...(boundSettings as Omit<Settings, 'validateOn'>) }"
							:id="option.id"
							v-model="value"
							:data-cy="`vsf-field-${field.name}`"
							:density="fieldDensity"
							:disabled="isValidating"
							:error="errorMessage ? errorMessage?.length > 0 : false"
							:error-messages="errorMessage"
							:hide-details="true"
							:label="option.label"
							:style="checkboxStyle"
							:true-value="option.value"
							@blur="onActions('blur')"
							@change="onActions('change')"
							@click="fieldValidateOn === 'blur' || fieldValidateOn === 'change' ? onActions('click') : undefined"
							@input="onActions('input')"
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
		</div>
	</div>
</template>


<script lang="ts" setup>
import { useField } from 'vee-validate';
import { VMessages } from 'vuetify/components';
import type { VSFCheckboxProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import type { VCheckbox } from 'vuetify/components';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFCheckboxProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldDensity = computed<VCheckbox['density']>(() => (field?.density ?? settings.value?.density) as VCheckbox['density']);
const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.required || false;
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;


const { errorMessage, setValue, validate, value } = useField(
	field.name,
	undefined,
	{
		initialValue: modelValue.value,
		validateOnBlur: fieldValidateOn.value === 'blur',
		validateOnChange: fieldValidateOn.value === 'change',
		validateOnInput: fieldValidateOn.value === 'input',
		validateOnModelUpdate: fieldValidateOn.value != null,
	},
);

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
		setValue(originalValue);
	}
});


// ------------------------- Validate On Actions //
const isValidating = ref<boolean>(field?.disabled as boolean);

async function onActions(action: ValidateAction): Promise<void> {
	if (!isValidating.value) {
		isValidating.value = true;

		modelValue.value = value.value;

		await useOnActions({
			action: field?.autoPage ? 'click' : action,
			emit,
			field,
			settingsValidateOn: settings.value.validateOn,
			validate,
		}).then(() => {
			isValidating.value = false;
		});
	}
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings.value.color,
	density: field.density || settings.value.density,
	falseValue: field.falseValue || undefined,
	hideDetails: field.hideDetails || settings.value.hideDetails,
	trueValue: field.trueValue || true,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>, [
	'validateOn',
]));


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

function fieldMessages(errorMessage: string | string[]) {
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

const controlGroupClasses = computed(() => ({
	'v-input--error': errorMessage ? errorMessage?.length > 0 : false,
	'v-selection-control-group': field.inline,
}));
</script>

<style lang="scss" scoped></style>
