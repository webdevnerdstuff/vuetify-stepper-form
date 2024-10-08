<template>
	<div
		:class="containerClasses"
		:style="containerStyle"
	>
		<v-container>
			<v-row v-if="title">
				<v-col>
					<h2>
						{{ title }}
					</h2>
				</v-col>
			</v-row>
		</v-container>

		<template
			v-for="field in fields"
			:key="field.name"
		>
			<input
				v-if="field.type === 'hidden' || !field.type"
				v-model="modelValue[field.name]"
				:name="field.name"
				type="hidden"
			/>

			<v-container v-else>

				<!-- ================================================== Checkbox -->
				<Fields.VSFCheckbox
					v-if="field.type === 'checkbox'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ================================================== Radio & Fancy Radio -->
				<Fields.VSFRadio
					v-if="field.type === 'radio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<Fields.VSFFancyRadio
					v-if="field.type === 'fancyRadio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@update:modelValue="callback()"
				/>

				<!-- ================================================== Select -->
				<Fields.VSFSelect
					v-if="field.type === 'select'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<Fields.VSFAutocomplete
					v-if="field.type === 'autocomplete'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<Fields.VSFCombobox
					v-if="field.type === 'combobox'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ================================================== Switch -->
				<Fields.VSFSwitch
					v-if="field.type === 'switch'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ================================================== Text Field -->
				<Fields.VSFTextField
					v-if="field.type === 'text' || field.type === 'textField' || field.type === 'number'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@update:modelValue="callback()"
				/>

				<!-- ========================= Color Field -->
				<Fields.VSFColorField
					v-if="field.type === 'color'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ========================= File Input -->
				<Fields.VSFFileInput
					v-if="field.type === 'file'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ================================================== Textarea -->
				<Fields.VSFTextarea
					v-if="field.type === 'textarea'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- TODO: User Select Field -->
				<!-- TODO: Date Field -->
			</v-container>
		</template>
	</div>
</template>

<script setup lang="ts">
import { AllProps } from './utils/props';
import { Props } from '@/plugin/types';
import {
	useContainerClasses,
} from './composables/classes';
import {
	useContainerStyle,
} from './composables/styles';
import componentEmits from './utils/emits';
import * as Fields from './components/index';
import { globalOptions } from '@/plugin/';
// import { watchDeep } from '@vueuse/core';




const attrs = useAttrs();
const slots = useSlots();
const emit = defineEmits([...componentEmits]);
const injectedOptions = inject(globalOptions, {});
// console.log('injectedOptions', injectedOptions);

// -------------------------------------------------- Props //
const props = withDefaults(defineProps<Props>(), { ...AllProps });

const { fields } = toRefs(props);
// console.log('AllProps', props);
// console.log('props', AllProps);
const stepperSettings = reactive({ ...attrs, ...props, ...injectedOptions });
const { title } = toRefs(props);

const settings = ref({
	...stepperSettings.settings,
	...props.settings,
});

// console.log('settings.value', settings.value);



// -------------------------------------------------- Data #
const modelValue = defineModel<any>();


onMounted(() => {
	callback();
});



// watch(() => fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// }), {
// 	deep: true,
// };

// watchDeep(fields.value, () => {
// 	console.log('xxxxxxxxxxxxx fields update', fields.value);
// });


function callback() {
	Object.values(fields.value).forEach((field) => {
		if (field.when) {
			const response = field.when(modelValue.value);
			const fieldIdx = fields.value.findIndex((f) => f.name === field.name);

			if (fields.value[fieldIdx]) {
				fields.value[fieldIdx].disabled = response;
			}
		}
	});
}

console.log({
	emit,
	modelValue,
	props,
	slots,
	stepperSettings,
});

// ------------------------------------------------ Class & Styles //
const containerClasses = computed(() => useContainerClasses({
	isOption: true,
}));

const containerStyle = computed(() => useContainerStyle({
	displayType: 'block',
}));
</script>

<style lang="scss" scoped></style>
