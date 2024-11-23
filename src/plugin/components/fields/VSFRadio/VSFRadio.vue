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
					v-slot="props"
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
						:data-cy="`vsf-field-group-${field.name}`"
						:density="fieldDensity"
						:direction="field?.direction"
						:disabled="isValidating"
						:error="hasErrors"
						:error-messages="props.errorMessage || field?.errorMessages"
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
								v-bind="{ ...boundSettings, ...props.field }"
								:id="undefined"
								:data-cy="`vsf-field-${field.name}`"
								:density="fieldDensity"
								:error="props.errorMessage ? props.errorMessage?.length > 0 : false"
								:error-messages="props.errorMessage"
								:false-value="field.falseValue"
								:label="option.label"
								:name="field.name"
								:style="radioStyle"
								:true-value="option.value || field.trueValue"
								:value="option.value"
								@blur="onActions(props.validate, 'blur')"
								@change="onActions(props.validate, 'change')"
								@click="fieldValidateOn === 'blur' || fieldValidateOn === 'change' ? onActions(props.validate, 'click') : undefined"
								@input="onActions(props.validate, 'input')"
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
import { Field } from 'vee-validate';
import type { VSFRadioProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import type { VRadio } from 'vuetify/components';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFRadioProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldDensity = computed<VRadio['density']>(() => (field?.density ?? settings.value?.density) as VRadio['density']);
const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.required || false;
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value.validateOn);
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.value.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


// ------------------------- Validate On Actions //
const isValidating = ref<boolean>(field?.disabled as boolean);

async function onActions(validate: FieldValidateResult, action: ValidateAction): Promise<void> {
	if (!isValidating.value) {
		isValidating.value = true;

		await useOnActions({
			action: field?.autoPage ? 'click' : action,
			emit,
			field,
			settingsValidateOn: settings.value.validateOn,
			validate,
		}).then(() => {
			isValidating.value = false;
		});
	}
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
	falseValue: field.falseValue || false,
	hideDetails: field.hideDetails || settings.value.hideDetails,
	trueValue: field.trueValue || true,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>));


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
