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
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';


const emit = defineEmits(['next']);
const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFSelectProps>();


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style lang="scss" scoped></style>
