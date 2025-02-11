<template>
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

			<div
				:id="field?.groupId"
				:style="radioContainerStyle"
			>
				<v-radio-group
					v-model="modelValue"
					:append-icon="field?.appendIcon"
					:data-cy="`vsf-field-group-${field.name}`"
					:density="fieldDensity"
					:direction="field?.direction"
					:disabled="isValidating"
					:error="hasErrors"
					:error-messages="errorMessage || field?.errorMessages"
					:hideDetails="field?.hideDetails || settings?.hideDetails"
					:hint="field?.hint"
					:inline="field?.inline"
					:max-errors="field?.maxErrors"
					:max-width="field?.maxWidth"
					:messages="field?.messages"
					:min-width="field?.minWidth"
					:multiple="field?.multiple"
					:persistentHint="field?.persistentHint"
					:prepend-icon="field?.prependIcon"
					:theme="field?.theme"
					:width="field?.width"
				>
					<div
						v-for="option, key in field?.options"
						:key="key"
					>
						<v-radio
							v-bind="{ ...boundSettings }"
							:id="undefined"
							:data-cy="`vsf-field-${field.name}`"
							:density="fieldDensity"
							:error="errorMessage ? errorMessage?.length > 0 : false"
							:error-messages="errorMessage"
							:false-value="field.falseValue"
							:label="option.label"
							:name="field.name"
							:style="radioStyle"
							:true-value="option.value || field.trueValue"
							:value="option.value"
							@blur="onActions('blur', option.value)"
							@change="onActions('change', option.value)"
							@click="fieldValidateOn === 'blur' || fieldValidateOn === 'change' ? onActions('click', option.value) : undefined"
							@input="onActions('input', option.value)"
						>
						</v-radio>
					</div>
				</v-radio-group>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { VSFRadioProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import type { VRadio } from 'vuetify/components';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFRadioProps>();

const { field } = toRefs(props);
const settings = inject<Ref<Settings>>('settings')!;

const fieldDensity = computed<VRadio['density']>(() => (field.value?.density ?? settings.value?.density) as VRadio['density']);
const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.value.required || false;
});
const fieldValidateOn = computed(() => field.value?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;


const { errorMessage, setValue, validate, value } = useField(
	field.value.name,
	undefined,
	{
		initialValue: modelValue.value,
		type: 'radio',
		validateOnBlur: fieldValidateOn.value === 'blur',
		validateOnChange: fieldValidateOn.value === 'change',
		validateOnInput: fieldValidateOn.value === 'input',
		validateOnModelUpdate: fieldValidateOn.value != null,
	},
);

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


// ------------------------- Validate On Actions //
const isValidating = ref<boolean>(field.value?.disabled as boolean);

async function onActions(action: ValidateAction, val?: string | number): Promise<void> {
	if (!isValidating.value) {
		isValidating.value = true;

		let updatedValue: string | string[];

		if (field.value?.multiple) {
			const localModelValue = Array.isArray(value.value) ? value.value.slice() : [];
			const valStr = String(val);

			if (localModelValue.includes(valStr)) {
				localModelValue.splice(localModelValue.indexOf(valStr), 1);
			}
			else {
				localModelValue.push(valStr);
			}

			updatedValue = localModelValue;
		}
		else {
			updatedValue = val as string;
		}

		setValue(updatedValue);
		modelValue.value = updatedValue;

		await useOnActions({
			action: field.value?.autoPage ? 'click' : action,
			emit,
			field: field.value,
			settingsValidateOn: settings.value.validateOn,
			validate,
		}).then(() => {
			isValidating.value = false;
		});
	}
}


const hasErrors = computed(() => {
	let err = field.value?.error;

	err = field.value?.errorMessages ? field.value.errorMessages.length > 0 : err;

	return err;
});

// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field.value,
	color: field.value.color || settings.value.color,
	density: field.value.density || settings.value.density,
	falseValue: field.value.falseValue || false,
	hideDetails: field.value.hideDetails || settings.value.hideDetails,
	trueValue: field.value.trueValue || true,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>));


// Styles //
const fieldContainerStyle = computed<CSSProperties>(() => {
	const styles = {
		'width': field.value?.minWidth ?? field.value?.width ?? undefined,
	};

	return styles as CSSProperties;
});

const inputControlContainerStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.value.labelPositionLeft;

	const styles = {
		'flex-direction': useInlineSpacing ? 'row' : 'column',
	};

	return styles as CSSProperties;
});


// Inline Radios //
const radioContainerStyle = computed<CSSProperties>(() => ({
	'display': field.value.inline ? 'flex' : undefined,
}));

const radioStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.value.inline && field.value.inlineSpacing;
	const marginRight = '10px';

	const styles = {
		'margin-right': useInlineSpacing ? field.value.inlineSpacing : marginRight,
	};

	return styles as CSSProperties;
});


</script>

<style lang="scss" scoped></style>
