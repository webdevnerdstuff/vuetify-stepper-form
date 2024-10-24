<template>
	<template
		v-for="(_, slot) in slots"
		:key="slot"
	>
		<div v-if="slot === `field.${[field.name]}`">
			<Field
				v-slot="{ errorMessage, validate }"
				v-model="modelValue"
				:name="field.name"
				:validate-on-model-update="false"
			>
				<slot
					v-bind="{
						errorMessage,
						field: boundSettings,
						FieldLabel: FieldLabelComponent,
						value: modelValue,
						blur: () => onActions(validate, 'blur'),
						change: () => onActions(validate, 'change'),
						input: () => onActions(validate, 'input'),
					}"
					:name="slot"
				>
				</slot>
			</Field>
		</div>
	</template>
</template>

<script lang="ts" setup>
import type {
	VSFCustomProps,
} from './index';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const slots = useSlots();
const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFCustomProps>();

const { field, settings } = props;

const FieldLabelComponent = toRaw(FieldLabel);


// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidateResult, action: ValidateAction): Promise<void> {
	useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.validateOn,
		validate,
	});
}


// Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));
</script>

<style scoped lang="scss"></style>
