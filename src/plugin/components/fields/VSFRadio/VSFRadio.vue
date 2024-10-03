<template>
	<div :style="fieldContainerStyle">
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
						'pb-5': field.labelPositionLeft,
					}"
					:label="field.label"
					:required="field.required"
				/>
			</v-label>

			<div :style="checkboxContainerStyle">
				<v-radio-group
					v-model="modelValue"
					:append-icon="field?.appendIcon"
					:error="hasErrors"
					:error-messages="field?.errorMessages"
					:inline="field?.inline"
					:max-errors="field?.maxErrors"
					:max-width="field?.maxWidth"
					:messages="field?.messages"
					:min-width="field?.minWidth"
					:prepend-icon="field?.prependIcon"
					:theme="field?.theme"
					:width="field?.width"
				>
					<v-radio
						v-for="option in field?.options"
						v-bind="boundSettings"
						:key="option.value"
						:label="option.label"
						:style="radioStyle"
						:value="option.value"
					>
					</v-radio>
				</v-radio-group>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type {
	VSFRadioProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';
import { useBindingSettings } from '@/plugin/composables/bindings';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFRadioProps>();

console.group('VSFRadio');
console.log('field', field);
console.log('settings', settings);
console.groupEnd();


const hasErrors = computed(() => {
	let err = field?.error;

	err = field?.errorMessages ? field.errorMessages.length > 0 : err;

	return err;
});

// Bound Settings //
const bindSettings = reactive({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	falseValue: field.falseValue || undefined,
});

const boundSettings = computed(() => useBindingSettings(bindSettings));


// Styles //
const fieldContainerStyle = computed<CSSProperties>(() => {
	const styles = {
		'width': field?.minWidth ?? field?.width ?? undefined,
	};

	return styles as CSSProperties;
});

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

const radioStyle = computed<CSSProperties>(() => {
	const useInlineSpacing = field.inline && field.inlineSpacing;
	const marginRight = '10px';

	const styles = {
		'margin-right': useInlineSpacing ? field.inlineSpacing : marginRight,
	};

	return styles as CSSProperties;
});


</script>

<style lang="scss" scoped></style>
