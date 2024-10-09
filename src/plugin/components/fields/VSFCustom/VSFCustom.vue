<template>
	<template
		v-for="(_, slot) in slots"
		:key="slot"
	>
		<div v-if="slot === `custom.${[field.name]}`">
			<slot
				v-bind="{
					field,
					boundSettings,
					FieldLabel: FieldLabelComponent,
				}"
				:name="slot"
			>
			</slot>
		</div>
	</template>
</template>

<script lang="ts" setup>
import type {
	VSFCustomProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';


const slots = useSlots();
const { field, settings } = defineProps<VSFCustomProps>();
const FieldLabelComponent = toRaw(FieldLabel);

// Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style scoped lang="scss"></style>
