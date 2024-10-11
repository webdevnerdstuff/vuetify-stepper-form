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
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';


const emit = defineEmits(['next']);
const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFAutocompleteProps>();


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });

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
