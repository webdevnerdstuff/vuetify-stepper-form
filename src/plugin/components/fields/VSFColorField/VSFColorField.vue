<template>
	<Field
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-model-update="false"
	>
		<VColorField
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
		</VColorField>
	</Field>
</template>


<script lang="ts" setup>
import type { VSFColorFieldProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import VColorField from '@wdns/vuetify-color-field';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import { Field } from 'vee-validate';;


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFColorFieldProps>();

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


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	hideDetails: field.hideDetails || settings?.hideDetails,
	type: undefined,
	variant: field.variant || settings?.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
