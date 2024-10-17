<template>
	<Form
		:ref="formFieldRef"
		:validation-schema="validateSchema"
	>
		<Field
			v-slot="{ errorMessage }"
			v-model="modelValue"
			:name="field.name"
			:validate-on-model-update="false"
		>
			<VColorField
				v-model="modelValue"
				v-bind="boundSettings"
				:error="errorMessage ? errorMessage?.length > 0 : false"
				:error-messages="errorMessage"
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
			</VColorField>
		</Field>
	</Form>
</template>


<script lang="ts" setup>
import { TriggerValidationBus } from '../../../utils/globals';
import type {
	TriggerValidation,
	UseOnActionsResponse,
	ValidateAction,
} from '../../../types';
import type {
	VSFColorFieldProps,
} from './index';
import VColorField from '@wdns/vuetify-color-field';
import FieldLabel from '../../shared/FieldLabel.vue';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';
import { useOnActions } from '../../../composables/validation';
import { Field, Form } from 'vee-validate';
import type { PrivateFormContext } from 'vee-validate';
import { useEventBus } from '@vueuse/core';


const emit = defineEmits([
	'next',
	'validate',
]);
const modelValue = defineModel<any>();
const props = defineProps<VSFColorFieldProps>();

const { field, pageIndex, settings, validateSchema } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });


// -------------------------------------------------- Validation //
const formFieldRef = `${Math.ceil(Math.random() * 1000)}-formFieldRef`;
const localForm = useTemplateRef<PrivateFormContext>(String(formFieldRef));


// ------------------------- Validate On Actions //
async function onActions(action: ValidateAction): Promise<UseOnActionsResponse | void> {
	let shouldValidate = false;

	const response = await useOnActions({
		action,
		emit,
		field: field,
		localForm: localForm.value,
		pageIndex,
		validateOn: field.validateOn || settings?.validateOn,
	})
		.then((response) => {
			shouldValidate = response.shouldValidate;
			return response;
		});

	if (!shouldValidate) {
		return;
	}

	return response;
}


// ------------------------- Bus Event //
const triggerValidationBus = useEventBus<TriggerValidation>(TriggerValidationBus);

function validationListener(data: any): void {
	if (data.pageIndex === pageIndex && field.type !== 'hidden' && field.type != null) {
		onActions(data.action);
	}
}

// Listen to an event //
const unsubscribeBus = triggerValidationBus.on(validationListener);

// Unsubscribe on unmount //
onUnmounted(() => {
	if (typeof unsubscribeBus !== 'undefined') {
		triggerValidationBus.off(validationListener);
	}
});


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
