<template>
	<VColorField
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
	</VColorField>
</template>


<script lang="ts" setup>
import type {
	VSFColorFieldProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';
import VColorField from '@wdns/vuetify-color-field';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFColorFieldProps>();

// console.group('VSFTextarea');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


// Bound Settings //
const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	type: 'text',
});

const boundSettings = computed(() => useBindingSettings(bindSettings));
</script>

<style lang="scss" scoped></style>
