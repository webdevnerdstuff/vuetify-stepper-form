<template>
	<Field
		v-slot="props"
		v-model="modelValue"
		:name="field.name"
		:syncVModel="true"
		type="checkbox"
		:unchecked-value="field.falseValue"
		:validate-on-blur="fieldValidateOn === 'blur'"
		:validate-on-change="fieldValidateOn === 'change'"
		:validate-on-input="fieldValidateOn === 'input'"
		:validate-on-model-update="false"
		:value="field.trueValue"
	>
		<v-switch
			v-bind="{ ...(boundSettings as Omit<Settings, 'validateOn'>), ...props.field }"
			:data-cy="`vsf-field-${field.name}`"
			:density="fieldDensity"
			:disabled="isValidating"
			:error="props.errorMessage ? props.errorMessage?.length > 0 : false"
			:error-messages="props.errorMessage"
			@blur="onActions((props.validate as ValidateFieldResult), 'blur')"
			@change="onActions((props.validate as ValidateFieldResult), 'change')"
			@click="fieldValidateOn === 'blur' || fieldValidateOn === 'change' ? onActions(props.validate, 'click') : undefined"
			@input="onActions((props.validate as ValidateFieldResult), 'input')"
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
import { Field } from 'vee-validate';
import type { VSFSwitchProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import type { VSwitch } from 'vuetify/components';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFSwitchProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldDensity = computed<VSwitch['density']>(() => (field?.density ?? settings.value?.density) as VSwitch['density']);
const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.required || false;
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


// ------------------------- Validate On Actions //
const isValidating = ref<boolean>(field?.disabled as boolean);

async function onActions(validate: ValidateFieldResult, action: ValidateAction): Promise<void> {
	if (!isValidating.value) {
		isValidating.value = true;

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
	falseValue: field.falseValue || false,
	hideDetails: field.hideDetails || settings.value.hideDetails,
	trueValue: field.trueValue || true,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>));
</script>

<style lang="scss" scoped></style>
