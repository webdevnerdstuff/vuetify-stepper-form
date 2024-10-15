<template>
	<v-row v-if="page.title">
		<v-col>
			<h3>
				{{ page.title }}
			</h3>
		</v-col>
	</v-row>

	<v-row v-if="page.text">
		<v-col>
			{{ page.text }}
		</v-col>
	</v-row>

	<template
		v-for="field in page.fields"
		:key="field.name"
	>
		<input
			v-if="field.type === 'hidden' || !field.type"
			v-model="modelValue[field.name]"
			:name="field.name"
			type="hidden"
		/>

		<v-row v-else>
			<v-col
				v-if="field.text"
				cols="12"
			>
				<div v-html="field.text" />
			</v-col>

			<v-col cols="12">
				<!-- ================================================== Checkbox -->
				<Fields.VSFCheckbox
					v-if="field.type === 'checkbox'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<!-- ================================================== Radio & Fancy Radio -->
				<Fields.VSFRadio
					v-if="field.type === 'radio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<Fields.VSFFancyRadio
					v-if="field.type === 'fancyRadio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<!-- ================================================== Select -->
				<Fields.VSFSelect
					v-if="field.type === 'select'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					:triggerValidation="triggerValidationEvents"
					:validateSchema="validateSchema"
					@next="nextPage"
					@validate="onValidate"
				/>

				<Fields.VSFAutocomplete
					v-if="field.type === 'autocomplete'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<Fields.VSFCombobox
					v-if="field.type === 'combobox'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
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
					v-if="field.type === 'text' || field.type === 'textField' || field.type === 'number' || field.type === 'email' || field.type === 'password' || field.type === 'tel' || field.type === 'url'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					:triggerValidation="triggerValidationEvents"
					:validateSchema="validateSchema"
					@next="nextPage"
					@validate="onValidate"
				/>

				<!-- ========================= Color Field -->
				<Fields.VSFColorField
					v-if="field.type === 'color'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<!-- ========================= File Input -->
				<Fields.VSFFileInput
					v-if="field.type === 'file'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@next="nextPage"
				/>

				<!-- ================================================== Textarea -->
				<Fields.VSFTextarea
					v-if="field.type === 'textarea'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
				/>

				<!-- ================================================== Custom Field -->
				<template v-if="field.type === 'custom'">
					<Fields.VSFCustom
						v-if="field.type === 'custom'"
						v-model="modelValue[field.name]"
						:field="field"
						:settings="settings"
					>
						<!-- ========================= Pass Slots -->
						<template
							v-for="(_, slot) in $slots"
							#[slot]="scope"
						>
							<slot
								:name="slot"
								v-bind="{ ...scope }"
							/>
						</template>
					</Fields.VSFCustom>
				</template>

				<!-- TODO: User Select Field -->
				<!-- TODO: Date Field -->

				<template v-if="field.type === 'submit'">
					<v-btn
						:color="field.color || settings.color"
						:type="field.type"
					>
						{{ field.label }}
					</v-btn>
				</template>
			</v-col>
		</v-row>
	</template>
</template>

<script setup lang="ts">
import * as Fields from '../fields/index';
import type {
	Field,
	Page,
	Settings,
} from '../../types/index';


export interface FieldLabelProps {
	index: number;
	page: Page;
	settings: Settings;
	triggerValidation: boolean;
	validateSchema: any;
}

const emit = defineEmits(['next', 'validate']);
const { index, page, triggerValidation } = defineProps<FieldLabelProps>();


console.group('PageContainer');
console.log('index', index);
console.log('page', page);
console.groupEnd();

const modelValue = defineModel<any>();

const triggerValidationEvents = computed(() => triggerValidation);

// watch(triggerValidationEvents, (val) => {
// 	console.log('triggerValidation', val);
// });


function onValidate(val) {
	emit('validate', val);
}


function nextPage(field: Field) {
	const fieldIndex = page.fields.findIndex((f) => f.name === field.name);

	// ? Before advancing to the next page, check if the current field is the last field on the page //
	if (fieldIndex === page.fields.length - 1) {
		emit('next');
	}
}
</script>

<style lang="scss" scoped></style>
