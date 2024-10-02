<template>
	<v-switch
		v-bind="boundSettings"
		v-model="modelValue"
		:disabled="field?.disabled"
		:false-icon="falseIcon"
		:false-value="field?.falseValue || false"
		:true-value="field.trueValue || true"
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
import type { VSwitch } from 'vuetify/components';
import type {
	VSFSwitchProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';

const { falseIcon, field, settings } = defineProps<VSFSwitchProps>();


console.group('VSFSwitch');
console.log('field', field);
console.log('settings', settings);
console.groupEnd();


const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
});


const modelValue = defineModel<any>();
const boundSettings = computed(() => useBindingSettings(bindSettings));
console.log('bindingSettings', boundSettings.value);

</script>

<style lang="scss" scoped></style>
