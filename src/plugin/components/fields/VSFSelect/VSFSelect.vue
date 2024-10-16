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
			<v-select
				v-model="modelValue"
				v-bind="boundSettings"
				:error="errorMessage ? errorMessage?.length > 0 : false"
				:error-messages="errorMessage"
				:items="(field.items as any)"
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
			</v-select>
		</Field>
	</Form>
</template>


<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { TriggerValidationBus } from '../../../utils/globals';
import type {
	TriggerValidation,
	UseOnActionsResponse,
	ValidateAction,
} from '../../../types';
import type {
	VSFSelectProps,
} from './index';
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
const props = defineProps<VSFSelectProps>();

const { field, pageIndex, settings, validateSchema } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.validationRules?.find((rule) => rule.type === 'required');
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
		validateOn: field.validateOn
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
	console.group('--------------------------- CHILD BUS');
	console.log('data', data);
	console.log('pageIndex', pageIndex);

	if (data.pageIndex === pageIndex) {
		console.log('field', field.name);

		onActions('page').then((response) => {
			console.log('response', response);
			// checkIfFieldHasErrors(response);
		});
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
	variant: field.variant || settings?.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
