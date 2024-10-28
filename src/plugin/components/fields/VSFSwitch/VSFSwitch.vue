<template>
	<Field
		v-slot="{ errorMessage, validate }"
		v-model="modelValue"
		:name="field.name"
		:validate-on-blur="fieldValidateOn === 'blur'"
		:validate-on-change="fieldValidateOn === 'change'"
		:validate-on-input="fieldValidateOn === 'input'"
		:validate-on-model-update="false"
	>
		<v-switch
			v-bind="boundSettings"
			v-model="modelValue"
			:error="errorMessage ? errorMessage?.length > 0 : false"
			:error-messages="errorMessage"
			@blur="onActions((validate as ValidateFieldResult), 'blur')"
			@change="onActions((validate as ValidateFieldResult), 'change')"
			@input="onActions((validate as ValidateFieldResult), 'input')"
		>
			<template #label>
				<FieldLabel
					:label="field.label"
					:required="fieldRequired"
				/>
			</template>
		</v-switch>
	</Field>
</template>


<script lang="ts" setup>
import type { VSFSwitchProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFSwitchProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


// ------------------------- Validate On Actions //
async function onActions(validate: ValidateFieldResult, action: ValidateAction): Promise<void> {
	useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.value.validateOn,
		validate,
	});
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings.value.color,
	density: field.density || settings.value.density,
	hideDetails: field.hideDetails || settings.value.hideDetails,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
