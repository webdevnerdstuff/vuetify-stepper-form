<template>
	<Field
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-model-update="false"
	>
		<component
			:is="component"
			v-model="modelValue"
			v-bind="boundSettings"
			:error="hasErrors"
			:error-messages="errorMessage || field.errorMessages"
			:items="fieldItems"
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
		</component>
	</Field>

	<!-- Vuetify Field {{ field }} -->
</template>


<script lang="ts" setup>
import type { VuetifyFieldProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VuetifyFieldProps>();

const { field, settings } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
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

const fieldItems = computed(() => field?.items ? field.items as any : undefined);
const fieldType = computed(() => {
	if (field.type === 'color') {
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
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	hideDetails: field.hideDetails || settings?.hideDetails,
	type: fieldType.value,
	variant: field.variant || settings?.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
