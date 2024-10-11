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
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import VColorField from '@wdns/vuetify-color-field';
import { useAutoPage } from '../../../composables/helpers';


const emit = defineEmits(['next']);
const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFColorFieldProps>();


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });


// -------------------------------------------------- Bound Settings //
const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	type: 'text',
});

const boundSettings = computed(() => useBindingSettings(bindSettings));
</script>

<style lang="scss" scoped></style>
