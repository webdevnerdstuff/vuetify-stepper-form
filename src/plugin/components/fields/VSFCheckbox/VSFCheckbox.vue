<template>
	<v-checkbox
		v-if="!field?.multiple"
		v-bind="boundSettings"
		v-model="modelValue"
	>
		<template #label>
			<FieldLabel
				:label="field.label"
				:required="field.required"
			/>
		</template>
	</v-checkbox>

	<div
		v-else
		class="v-input v-input--horizontal v-input--center-affix"
	>
		<div
			class="v-input__control"
			:style="inputControlContainerStyle"
		>
			<v-label
				v-if="field.label"
				:class="{
					'me-2': field.labelPositionLeft,
				}"
			>
				<FieldLabel
					:class="{
						'pb-5': !field?.hideDetails,
					}"
					:label="field.label"
					:required="field.required"
				/>
			</v-label>

			<div
				:class="{
					'v-selection-control-group': !field.inline,
				}"
				:style="checkboxContainerStyle"
			>
				<v-checkbox
					v-for="option in field?.options"
					v-bind="boundSettings"
					:key="option.value"
					v-model="modelValue"
					:label="option.label"
					:style="checkboxStyle"
					:true-value="option.value"
				>
				</v-checkbox>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type {
	VSFCheckboxProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useAutoPage } from '../../../composables/helpers';


const emit = defineEmits(['next']);
const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFCheckboxProps>();


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });

// console.group('VSFCheckbox');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();




// Bound Settings //
const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	falseValue: field.falseValue || undefined,
});

const boundSettings = computed(() => useBindingSettings(bindSettings));


// Styles //
const inputControlContainerStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.labelPositionLeft;

	const styles = {
		'flex-direction': useInlineSpacing ? 'row' : 'column',
	};

	return styles as CSSProperties;
});


// Inline Checkboxes //
const checkboxContainerStyle = computed<CSSProperties>(() => ({
	'display': field.inline ? 'flex' : undefined,
}));

const checkboxStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.inline && field.inlineSpacing;
	const marginRight = '10px';

	const styles = {
		'margin-right': useInlineSpacing ? field.inlineSpacing : marginRight,
	};

	return styles as CSSProperties;
});


</script>

<style lang="scss" scoped></style>
