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

const { field } = toRefs(props);
const settings = inject<Ref<Settings>>('settings')!;

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
		field: field.value,
		settingsValidateOn: settings.value.validateOn,
		validate,
	});
}

const fieldItems = computed(() => field.value?.items ? field.value.items as unknown : undefined);
const fieldType = computed(() => {
	if (field.value.type === 'color' || field.value.type === 'date') {
		return 'text';
	}

	return field.value.type;
});
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
	hideDetails: field.value.hideDetails || settings.value.hideDetails,
	type: fieldType.value,
	variant: field.value.variant || settings.value.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>));
</script>

<style lang="scss" scoped></style>
