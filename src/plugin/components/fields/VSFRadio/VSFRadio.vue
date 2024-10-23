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
					:required="fieldRequired"
				/>
			</v-label>

			<div
				:id="field?.groupId"
				:style="radioContainerStyle"
			>
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
					<Field
						v-for="option in field?.options"
						:key="option.value"
						v-slot="{ errorMessage, validate }"
						v-model="modelValue"
						:name="field.name"
						type="radio"
						:validate-on-model-update="true"
					>
						<v-radio
							v-bind="boundSettings"
							:id="undefined"
							:error="hasErrors"
							:error-messages="errorMessage"
							:label="option.label"
							:style="radioStyle"
							:value="option.value"
							@blur="onActions(validate, 'blur')"
							@change="onActions(validate, 'change')"
							@input="onActions(validate, 'input')"
						>
						</v-radio>
					</Field>
				</v-radio-group>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type { VSFRadioProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFRadioProps>();

const { field, settings } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});


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


const hasErrors = computed(() => {
	let err = field?.error;

	err = field?.errorMessages ? field.errorMessages.length > 0 : err;

	return err;
});

// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings?.color,
	density: field.density || settings?.density,
	falseValue: field.falseValue || undefined,
	hideDetails: field.hideDetails || settings?.hideDetails,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value));


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


// Inline Radios //
const radioContainerStyle = computed<CSSProperties>(() => ({
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
