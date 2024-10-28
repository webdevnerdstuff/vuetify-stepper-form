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

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const FieldLabelComponent = toRaw(FieldLabel);


// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidateResult, action: ValidateAction): Promise<void> {
	useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.value.validateOn,
		validate,
	});
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings.value.color,
	density: field.density || settings.value.density,
}));

const boundSettings = computed(() => {
	return {
		...useBindingSettings(bindSettings.value),
		options: field.options,
	};
});
</script>

<style scoped lang="scss"></style>
