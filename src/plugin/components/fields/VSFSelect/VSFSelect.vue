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
						:required="field.required"
					/>
				</template>
			</v-select>
		</Field>
	</Form>
</template>


<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import type {
	VSFSelectProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';
import { useOnActions } from '../../../composables/validation';
import { Field, Form } from 'vee-validate';
import type { PrivateFormContext } from 'vee-validate';


const emit = defineEmits(['next', 'validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFSelectProps>();

const { field, settings, validateSchema } = props;


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });


// -------------------------------------------------- Validation //
const { triggerValidation } = toRefs(props);
const triggerValidationEvents = computed(() => triggerValidation.value);
const formFieldRef = `${Math.ceil(Math.random() * 1000)}-formFieldRef`;
const localForm = useTemplateRef<PrivateFormContext>(String(formFieldRef));

watch(triggerValidationEvents, () => {
	onActions('global');
});

// Validate On Actions //
async function onActions(action: string) {
	useOnActions({
		action,
		field: field,
		localForm: localForm.value,
		validateOn: field.validateOn,
	})
		.then((response) => {
			emitValidate(response.results, field);
		});
}

function emitValidate(response, field) {
	emit('validate', { errors: response?.errors, fieldName: field.name });
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
