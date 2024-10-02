<template>
	<v-switch
		v-bind="boundSettings"
		v-model="modelValue"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
	</v-switch>
</template>


<script lang="ts" setup>
import type {
	VSFSwitchProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFSwitchProps>();

// console.group('VSFSwitch');
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
