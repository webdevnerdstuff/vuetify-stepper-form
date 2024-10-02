<template>
	<v-textarea
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
	</v-textarea>
</template>


<script lang="ts" setup>
import type {
	VSFTextareaProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFTextareaProps>();

// console.group('VSFTextarea');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


// Bound Settings //
const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
});

const boundSettings = computed(() => useBindingSettings(bindSettings));
</script>

<style lang="scss" scoped></style>
