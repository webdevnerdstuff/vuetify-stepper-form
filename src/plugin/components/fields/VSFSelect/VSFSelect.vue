<template>
	<v-select
		v-model="modelValue"
		v-bind="boundSettings"
		:items="(field.items as any)"
		:required="field.required"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
	</v-select>
</template>


<script lang="ts" setup>
import type {
	VSFSelectProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFSelectProps>();

// const { field, settings } = toRefs(props);

// console.group('VSFTextField');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


// Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
