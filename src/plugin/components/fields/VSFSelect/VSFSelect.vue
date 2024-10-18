<template>
	<Field
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-model-update="false"
	>
		<v-select
			v-model="modelValue"
			v-bind="boundSettings"
			:error="errorMessage ? errorMessage?.length > 0 : false"
			:error-messages="errorMessage"
			:items="(field.items as any)"
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
		</v-select>
	</Field>
</template>


<script lang="ts" setup>
import type { VSFSelectProps } from './index';
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
const props = defineProps<VSFSelectProps>();

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
	hideDetails: field.hideDetails || settings?.hideDetails,
	variant: field.variant || settings?.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
