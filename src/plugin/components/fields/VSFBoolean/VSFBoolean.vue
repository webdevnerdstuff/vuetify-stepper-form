<template>
	<div>

		<radio
			v-model="modelValue[field.name]"
			:field="field"
			:settings="settings"
		/>

		<FieldLabel
			:label="field.label"
			:required="field.required"
		/>
	</div>
</template>


<script lang="ts" setup>
import type {
	VSFBooleanProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
// import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFBooleanProps>();

// console.group('VSFTextField');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


// Bound Settings //
// const bindSettings = reactive({
// 	...field,
// 	color: field.color || settings?.color,
// 	density: field.density || settings?.density,
// });

// const boundSettings = computed(() => useBindingSettings(bindSettings));
</script>

<style lang="scss" scoped></style>
