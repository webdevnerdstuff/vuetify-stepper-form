<template>
	<v-row v-if="page.text">
		<v-col v-html="page.text"></v-col>
	</v-row>

	<v-row>
		<template
			v-for="field in page.fields"
			:key="`${field.name}-${field.type}`"
		>
			<input
				v-if="field.type === 'hidden' || !field.type"
				v-model="modelValue[field.name]"
				:data-cy="`vsf-field-${field.name}`"
				:name="field.name"
				type="hidden"
			/>

			<template v-else>
				<v-col
					v-if="field.text"
					cols="12"
				>
					<div
						data-cy="vsf-field-text"
						v-html="field.text"
					/>
				</v-col>

				<v-col :class="getColumnClasses(field)">
					<!-- ================================================== Checkbox -->
					<Fields.VSFCheckbox
						v-if="field.type === 'checkbox'"
						v-model="modelValue[field.name]"
						:field="(field as any)"
						@validate="onValidate"
					/>

					<!-- ================================================== Radio & Fancy Radio -->
					<Fields.VSFRadio
						v-if="field.type === 'radio'"
						v-model="modelValue[field.name]"
						:field="(field as any)"
						@validate="onValidate"
					/>

					<Fields.VSFButtonField
						v-if="field.type === 'buttons'"
						v-model="modelValue[field.name]"
						:field="(field as any)"
						@validate="onValidate"
					/>

					<!-- ================================================== Switch -->
					<Fields.VSFSwitch
						v-if="field.type === 'switch'"
						v-model="modelValue[field.name]"
						:field="(field as any)"
						@validate="onValidate"
					/>

					<!-- ================================================== Common Fields
						* VAutocomplete
						* VColorField
						* VCombobox
						* VFileInput
						* VSelect
						* VTextField
						* VTextarea
					-->
					<Fields.CommonField
						v-if="getComponent(field.type as string) != null"
						v-model="modelValue[field.name]"
						:component="getComponent(field.type as string)"
						:field="field"
						@validate="onValidate"
					/>

					<!-- ================================================== Custom Field (slot) -->
					<template v-if="field.type === 'field'">
						<Fields.VSFCustom
							v-if="field.type === 'field'"
							v-model="modelValue[field.name]"
							:field="field"
							@validate="onValidate"
						>
							<!-- ========================= Pass Slots -->
							<template
								v-for="(_, slot) in slots"
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
				</v-col>
			</template>
		</template>
	</v-row>
</template>

<script setup lang="ts">
import VColorField from '@wdns/vuetify-color-field';
import {
	VAutocomplete,
	VCombobox,
	VFileInput,
	VSelect,
	VTextField,
	VTextarea,
} from 'vuetify/components';
import { VDateInput } from 'vuetify/labs/VDateInput';
import type {
	ComputedClasses,
	Field,
	Page,
	ResponsiveColumns,
} from '../../types/index';
import { useColumnClasses } from '../../composables/classes';
import * as Fields from '../fields/index';


export interface PageContainerProps {
	fieldColumns: ResponsiveColumns | undefined;
	page: Page;
	pageIndex: number;
}

defineOptions({
	inheritAttrs: false,
});
const emit = defineEmits(['validate']);
const slots = defineSlots();
const props = defineProps<PageContainerProps>();
const { fieldColumns, page } = toRefs(props);


const textFields = [
	'email',
	'number',
	'password',
	'tel',
	'text',
	'textField',
	'url',
];

function getComponent(fieldType: string): Component | null {
	if (textFields.includes(fieldType)) {
		return markRaw(VTextField);
	}

	switch (fieldType) {
		case 'autocomplete':
			return markRaw(VAutocomplete);
		case 'color':
			return markRaw(VColorField);
		case 'combobox':
			return markRaw(VCombobox);
		case 'date':
			return markRaw(VDateInput);
		case 'file':
			return markRaw(VFileInput);
		case 'select':
			return markRaw(VSelect);
		case 'textarea':
			return markRaw(VTextarea);
		default:
			return null;
	}
}

const modelValue = defineModel<any>();

const pageColumns = computed(() => page.value?.pageFieldColumns ?? {});


// -------------------------------------------------- Columns //
const columnsMerged = ref<ResponsiveColumns>({
	...{
		lg: undefined,
		md: undefined,
		sm: undefined,
		xl: undefined,
	},
	...fieldColumns.value,
	...pageColumns.value,
});

function getColumnClasses(field: Field): ComputedClasses {
	return useColumnClasses({
		columnsMerged: columnsMerged.value,
		fieldColumns: field.columns,
		propName: `${field.name} field`,
	});
}

function onValidate(field: Field): void {
	emit('validate', field);
}
</script>

<style lang="scss" scoped></style>
