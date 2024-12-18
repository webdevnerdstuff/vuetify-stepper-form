<template>
	<component
		:is="component"
		v-model="value"
		v-bind="{ ...boundSettings }"
		:data-cy="`vsf-field-${field.name}`"
		:error="hasErrors"
		:error-messages="errorMessage || field.errorMessages"
		:items="fieldItems"
		@blur="onActions('blur')"
		@change="onActions('change')"
		@input="onActions('input')"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="fieldRequired"
			/>
		</template>
	</component>
</template>


<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { CommonFieldProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<CommonFieldProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

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
async function onActions(action: ValidateAction): Promise<void> {
	await useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.value.validateOn,
		validate,
	});
}

const fieldItems = computed(() => field?.items ? field.items as unknown : undefined);
const fieldType = computed(() => {
	if (field.type === 'color' || field.type === 'date') {
		return 'text';
	}

	return field.type;
});
const hasErrors = computed(() => {
	let err = field?.error;

	err = field?.errorMessages ? field.errorMessages.length > 0 : err;

	return err;
});

// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings.value.color,
	density: field.density || settings.value.density,
	hideDetails: field.hideDetails || settings.value.hideDetails,
	type: fieldType.value,
	variant: field.variant || settings.value.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>));
</script>

<style lang="scss" scoped></style>
