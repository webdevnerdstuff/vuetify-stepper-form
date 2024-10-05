<template>
	<v-text-field
		v-model="modelValue"
		v-bind="boundSettings"
		:error="hasError"
		:required="field.required"
		@blur="checkForErrors('blur')"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
	</v-text-field>
</template>


<script lang="ts" setup>
import type {
	VSFTextFieldProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFTextFieldProps>();

// const { field, settings } = toRefs(props);


const hasError = ref(false);


const validateOn = ref(field.validateOn || settings?.validateOn || 'input');

// console.log(validateOn.value);

onMounted(() => {
	checkForErrors(validateOn?.value);
});

watch(modelValue, () => {
	if (validateOn?.value === 'input') {
		checkForErrors('input');
	}
});

// TODO: Make this a composable //
function checkForErrors(param = 'update') {
	if (validateOn?.value === 'blur' && param !== 'blur') {
		return;
	}

	if (validateOn?.value === 'input' && param !== 'input') {
		return;
	}

	if (field.validate != null) {
		hasError.value = !field.validate(field, modelValue.value);
	}
}

// console.group('VSFTextField');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


// Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	error: hasError.value,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
