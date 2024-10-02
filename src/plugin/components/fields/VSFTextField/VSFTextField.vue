<template>
	<v-text-field
		v-model="modelValue"
		v-bind="boundSettings"
		:required="field.required"
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

// const props = withDefaults(defineProps<VSFTextFieldProps>(), {});
const { field, settings } = defineProps<VSFTextFieldProps>();

// console.group('VSFTextField');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
});

const modelValue = defineModel<any>();
const boundSettings = computed(() => useBindingSettings(bindSettings));

</script>

<style lang="scss" scoped></style>
