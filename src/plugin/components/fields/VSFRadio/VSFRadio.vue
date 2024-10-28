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
				<Field
					v-slot="{ errorMessage, validate }"
					v-model="modelValue"
					:name="field.name"
					type="radio"
					:validate-on-blur="fieldValidateOn === 'blur'"
					:validate-on-change="fieldValidateOn === 'change'"
					:validate-on-input="fieldValidateOn === 'input'"
					:validate-on-model-update="fieldValidateOn != null"
				>
					<v-radio-group
						v-model="modelValue"
						:append-icon="field?.appendIcon"
						:density="fieldDensity"
						:direction="field?.direction"
						:error="hasErrors"
						:error-messages="errorMessage || field?.errorMessages"
						:hideDetails="field?.hideDetails || settings?.hideDetails"
						:hint="field?.hint"
						:inline="field?.inline"
						:max-errors="field?.maxErrors"
						:max-width="field?.maxWidth"
						:messages="field?.messages"
						:min-width="field?.minWidth"
						:multiple="field?.multiple"
						:persistentHint="field?.persistentHint"
						:prepend-icon="field?.prependIcon"
						:theme="field?.theme"
						:width="field?.width"
					>
						<div
							v-for="option, key in field?.options"
							:key="key"
						>
							<v-radio
								v-bind="boundSettings"
								:id="undefined"
								:error="errorMessage ? errorMessage?.length > 0 : false"
								:error-messages="errorMessage"
								:label="option.label"
								:name="field.name"
								:style="radioStyle"
								:value="option.value"
								@click="onActions(validate, 'click')"
							>
							</v-radio>
						</div>
					</v-radio-group>
				</Field>
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

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldDensity = computed(() => field?.density ?? settings.value.density);
const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


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


const hasErrors = computed(() => {
	let err = field?.error;

	err = field?.errorMessages ? field.errorMessages.length > 0 : err;

	return err;
});

// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	color: field.color || settings.value.color,
	density: field.density || settings.value.density,
	falseValue: field.falseValue || undefined,
	hideDetails: field.hideDetails || settings.value.hideDetails,
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
