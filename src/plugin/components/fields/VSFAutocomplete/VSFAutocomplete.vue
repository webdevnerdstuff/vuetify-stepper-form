<template>
	<v-autocomplete
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
	</v-autocomplete>
</template>


<script lang="ts" setup>
import type {
	VSFAutocompleteProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFAutocompleteProps>();

// const { field, settings } = toRefs(props);

// console.group('VSFAutocomplete');
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
