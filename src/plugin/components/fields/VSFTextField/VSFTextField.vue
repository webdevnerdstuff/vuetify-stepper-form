<template>
	<!-- <v-text-field
		v-model="value"
		v-bind="boundSettings"
		:error-messages="errorMessage"
		@blur="onBlur"
		@change="onChange"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
</v-text-field> -->

	<Form :validation-schema="validateSchema">
		<Field
			v-slot="{ errorMessage, validate }"
			v-model="modelValue"
			:name="field.name"
		>
			<v-text-field
				v-model="modelValue"
				v-bind="boundSettings"
				:error-messages="errorMessage"
				@blur="onActions('blur', validate)"
				@change="onActions('change', validate)"
				@input="onActions('input', validate)"
			>
				<template #label>
					<FieldLabel
						:label="field.label"
						:required="field.required"
					/>
				</template>
			</v-text-field>
		</Field>
	</Form>

	<!-- <v-text-field
		v-model="value"
		v-bind="boundSettings"
		:error-messages="errorMessage"
		@blur="onBlur"
		@change="onChange"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
</v-text-field> -->

</template>


<script lang="ts" setup>
import type {
	VSFTextFieldProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';
import { Field, Form } from 'vee-validate';
import type { FieldValidator } from 'vee-validate';



const emit = defineEmits(['next', 'validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFTextFieldProps>();

const { field, settings, validateSchema } = props;


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });



// const schema = ref({});
// const validationSchema = ref();

// useForm({
// 	validationSchema: schema.value,
// });


async function onActions(action: string, validate: FieldValidator<unknown>) {
	console.log('onActions', action);
	if (action === 'blur' && field.validateOn === 'blur') {
		await validate();
	}

	if (action === 'input' && field.validateOn === 'input') {
		await validate();
	}

	if (action === 'change' && field.validateOn === 'change') {
		await validate();
	}
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	// error: hasError.value,
	hideDetails: field.hideDetails || settings?.hideDetails,
	variant: field.variant || settings?.variant,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
