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

	<v-row>
		<template
			v-for="field in page.fields"
			:key="`${field.name}-${field.type}`"
		>
			<input
				v-if="field.type === 'hidden' || !field.type"
				v-model="modelValue[field.name]"
				:name="field.name"
				type="hidden"
			/>


			<v-col
				v-if="field.text"
				cols="12"
			>
				<div v-html="field.text" />
			</v-col>

			<v-col :class="getColumnClasses(field)">
				<!-- ================================================== Checkbox -->
				<Fields.VSFCheckbox
					v-if="field.type === 'checkbox'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@validate="onValidate"
				/>

				<!-- ================================================== Radio & Fancy Radio -->
				<Fields.VSFRadio
					v-if="field.type === 'radio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@validate="onValidate"
				/>

				<Fields.VSFFancyRadio
					v-if="field.type === 'fancyRadio'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
					@validate="onValidate"
				/>

				<!-- ================================================== Switch -->
				<Fields.VSFSwitch
					v-if="field.type === 'switch'"
					v-model="modelValue[field.name]"
					:field="field"
					:settings="settings"
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
					:settings="settings"
					@validate="onValidate"
				/>

				<!-- ================================================== Custom Field (slot) -->
				<template v-if="field.type === 'field'">
					<Fields.VSFCustom
						v-if="field.type === 'field'"
						v-model="modelValue[field.name]"
						:field="field"
						:settings="settings"
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
	</v-row>
</template>

<script setup lang="ts">
import * as Fields from '../fields/index';
import type {
	Field,
	Page,
	ResponsiveColumns,
	Settings,
} from '../../types/index';
import {
	VAutocomplete,
	VCombobox,
	VFileInput,
	VSelect,
	VTextarea,
	VTextField,
} from 'vuetify/components';
import VColorField from '@wdns/vuetify-color-field';
import { useColumnErrorCheck } from '../../composables/helpers';


export interface FieldLabelProps {
	index: number;
	page: Page;
	settings: Settings;
}

export interface PageContainerProps {
	fieldColumns: ResponsiveColumns | undefined;
	page: Page;
	settings: Settings;
}

const emit = defineEmits(['validate']);
const slots = defineSlots();
const { fieldColumns, page } = defineProps<PageContainerProps>();


const textFields = [
	'text',
	'textField',
	'number',
	'email',
	'password',
	'tel',
	'url',
];

function getComponent(fieldType: string): Component | null {
	if (fieldType === 'autocomplete') {
		return markRaw(VAutocomplete);
	}

	if (fieldType === 'color') {
		return markRaw(VColorField);
	}

	if (fieldType === 'combobox') {
		return markRaw(VCombobox);
	}

	if (fieldType === 'file') {
		return markRaw(VFileInput);
	}

	if (fieldType === 'select') {
		return markRaw(VSelect);
	}

	if (fieldType === 'textarea') {
		return markRaw(VTextarea);
	}

	if (textFields.includes(fieldType)) {
		return markRaw(VTextField);
	}

	return null;
}

const modelValue = defineModel<any>();


// -------------------------------------------------- Columns //
const columnDefaults = {
	lg: 12,
	md: 12,
	sm: 12,
	xl: 12,
};

const columnsMerged = ref<ResponsiveColumns>({
	...columnDefaults,
	...fieldColumns,
});

function getColumnClasses(field: Field) {
	useColumnErrorCheck({
		columns: field.columns,
		propName: `${field.name} prop "columns"`,
	});

	return {
		'v-col-12': true,
		'v-cols': true,
		[`v-col-sm-${field?.columns?.sm ?? columnsMerged.value.sm}`]: true,
		[`v-col-md-${field?.columns?.md ?? columnsMerged.value.md}`]: true,
		[`v-col-lg-${field?.columns?.lg ?? columnsMerged.value.lg}`]: true,
		[`v-col-xl-${field?.columns?.xl ?? columnsMerged.value.xl}`]: true,
	};
}

function onValidate(field: Field): void {
	emit('validate', field);
}
</script>

<style lang="scss" scoped></style>
