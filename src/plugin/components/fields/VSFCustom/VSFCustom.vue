<template>
	<template
		v-for="(_, slot) in slots"
		:key="slot"
	>
		<div
			v-if="slot === `field.${[field.name]}`"
			:data-cy="`vsf-field-${field.name}`"
		>
			<slot
				v-bind="{
					FieldLabel: FieldLabelComponent,
					blur: () => onActions('blur'),
					change: () => onActions('change'),
					input: () => onActions('input'),
					onUpdate: (value: any) => { updateValue(value); },
					field: {
						errorMessages: $useField.errorMessage.value,
						...boundSettings,
					},
					...useFieldBoundSettings,
				}"
				:name="slot"
			>
			</slot>
		</div>
	</template>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';
import type {
	VSFCustomProps,
} from './index';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const slots = useSlots();
const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFCustomProps>();

const { field } = toRefs(props);
const settings = inject<Ref<Settings>>('settings')!;

const FieldLabelComponent = toRaw(FieldLabel);
const fieldValidateOn = computed(() => field.value?.validateOn ?? settings.value.validateOn);


const $useField = useField(
	field.value.name,
	undefined,
	{
		initialValue: modelValue.value,
		validateOnBlur: fieldValidateOn.value === 'blur',
		validateOnChange: fieldValidateOn.value === 'change',
		validateOnInput: fieldValidateOn.value === 'input',
		validateOnModelUpdate: fieldValidateOn.value != null,
	},
);


// ------------------------- Validate On Actions //
async function onActions(action: ValidateAction): Promise<void> {
	await useOnActions({
		action,
		emit,
		field: field.value,
		settingsValidateOn: settings.value.validateOn,
		validate: $useField.validate,
	});
}

function updateValue(value: any) {
	$useField.setValue(value);
}


// -------------------------------------------------- Bound Settings //
const useFieldBoundSettings = computed(() => {
	return {
		...useBindingSettings($useField as Partial<Settings>, [
			'_vm',
			'errorMessage',
			'field',
			'id',
			'label',
			'name',
			'type',
			'value',
		]),
	};
});

const bindSettings = computed(() => ({
	...field.value,
	color: field.value.color || settings.value.color,
	density: field.value.density || settings.value.density,
}));

const boundSettings = computed(() => {
	return {
		...useBindingSettings(bindSettings.value as Partial<Settings>),
		options: field.value.options,
		required: field.value.required,
	};
});
</script>

<style scoped lang="scss"></style>
