<template>
	<Field
		v-slot="{ errorMessage, validate, handleInput }"
		v-model="modelValue"
		:name="field.name"
		type="text"
		:validate-on-blur="fieldValidateOn === 'blur'"
		:validate-on-change="fieldValidateOn === 'change'"
		:validate-on-input="fieldValidateOn === 'input'"
		:validate-on-model-update="fieldValidateOn != null"
	>
		<div :class="{
			...buttonFieldContainerClass,
			'v-input--error': errorMessage ? errorMessage?.length > 0 : false,
		}">
			<v-label>
				<FieldLabel
					:label="field.label"
					:required="fieldRequired"
				/>
			</v-label>

			<v-item-group
				:id="field?.id"
				v-model="modelValue"
				class="mt-2"
				:class="itemGroupClass"
				:style="itemGroupStyle"
			>

				<v-item
					v-for="option, key in field?.options"
					:key="option.value"
				>
					<template #default>
						<v-btn
							v-bind="boundSettings"
							:id="getId(option, key)"
							:active="isActive(option.value)"
							:appendIcon="getIcon(option, 'appendIcon')"
							class="text-none"
							:class="{
								[`${option?.class}`]: true,
								...buttonClass,
								[`${field.selectedClass}`]: isActive(option.value),
							}"
							:color="option?.color || field?.color || settings?.color"
							data-test-id="vsf-button-field"
							:density="fieldDensity"
							:height="getHeight(option)"
							:icon="getIcon(option, 'icon')"
							:maxWidth="getMaxWidth(option)"
							:minWidth="getMinWidth(option)"
							:prependIcon="getIcon(option, 'prependIcon')"
							:variant="getVariant(option.value)"
							:width="getWidth(option)"
							@click.prevent="onActions(validate, 'click', option.value); handleInput(modelValue)"
							@keydown.space.prevent="onActions(validate, 'click', option.value); handleInput(modelValue)"
							@mousedown="onFocus(option.value)"
							@mouseleave="onFocus(null)"
							@mouseup="onFocus(null)"
						>
							<template
								v-if="getIcon(option, 'icon') == null"
								#default
							>
								<span
									class="vsf-button-field__btn-label"
									:class="getLabelClass(option)"
									v-html="option.label"
								></span>
							</template>
						</v-btn>
					</template>
				</v-item>
			</v-item-group>

			<div
				v-if="hasDetails"
				class="v-input__details"
			>
				<VMessages
					:active="activeMessages(errorMessage)"
					:color="errorMessage ? 'error' : undefined"
					:messages="fieldMessages(errorMessage)"
				>
				</VMessages>
			</div>
		</div>

		<input
			:name="field.name"
			type="hidden"
			:value="modelValue"
		/>
	</Field>
</template>


<script lang="ts" setup>
import { Field } from 'vee-validate';
import { VMessages } from 'vuetify/components';
import type { Option, VSFButtonFieldProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import type { VBtn } from 'vuetify/components';
import { useBindingSettings } from '../../../composables/bindings';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';

const emit = defineEmits(['validate']);
const modelValue = defineModel<unknown>();
const props = defineProps<VSFButtonFieldProps>();

const { field } = props;
const settings = inject<Ref<Settings>>('settings')!;

const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.required || false;
});
const fieldValidateOn = computed(() => field?.validateOn ?? settings.value?.validateOn);
const originalValue = modelValue.value;

onUnmounted(() => {
	if (!settings.value?.keepValuesOnUnmount) {
		modelValue.value = originalValue;
	}
});


if (modelValue?.value == null) {
	modelValue.value = field?.multiple ? [] : null;
}

const currentValue = ref(modelValue.value);

// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidateResult, action: ValidateAction, value?: string | number): Promise<void> {
	if (currentValue.value === value && (fieldValidateOn.value === 'change' || fieldValidateOn.value === 'input')) {
		return;
	}

	if (!field?.disabled && value) {
		if (field?.multiple) {
			const localModelValue = modelValue.value == null ? [] : modelValue.value as string[];

			if (localModelValue != null && localModelValue.includes(String(value))) {
				const index = localModelValue.indexOf(String(value));
				localModelValue.splice(index, 1);
			}
			else {
				localModelValue.push(String(value));
			}

			modelValue.value = localModelValue;
		}
		else {
			modelValue.value = value;
		}
	}

	await useOnActions({
		action,
		emit,
		field,
		settingsValidateOn: settings.value?.validateOn,
		validate,
	}).then(() => {
		currentValue.value = modelValue.value;
	})
		.catch((error: Error) => {
			console.error(error);
		});
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field,
	border: field?.border ? `${field?.color} ${field?.border}` : undefined,
	color: field.color || settings.value?.color,
	density: field?.density ?? settings.value?.density as VBtn['density'],
	hideDetails: field.hideDetails || settings.value?.hideDetails,
	multiple: undefined,
}));

const boundSettings = computed(() => useBindingSettings(bindSettings.value as Partial<Settings>, [
	'autoPage',
	'hideDetails',
	'href',
	'maxErrors',
	'multiple',
	'to',
]));


// -------------------------------------------------- Properties //
const getIcon = (option: Option, prop: string): string => {
	const optionValue = option[prop] as string;
	const fieldValue = field?.[prop];

	return optionValue ?? fieldValue;
};


function getId(option: { id?: string; }, key: string | number) {
	if (option.id != null) {
		return option.id;
	}

	return field?.id ? `${field?.id}-${key}` : undefined;
}


// -------------------------------------------------- Properties //

// ------------------------- Density & Sizes //
const densityValues = {
	comfortable: '48px',
	compact: '40px',
	default: '56px',
	expanded: '64px',
	oversized: '72px',
};

const fieldDensity = computed<VBtn['density']>(() => (field?.density ?? settings.value?.density) as VBtn['density']);

function getDensityValue(): string {
	return fieldDensity.value ? densityValues[fieldDensity.value] : densityValues['default'];
}

function getMinWidth(option: Option): string | number | undefined {
	const minWidth = option?.minWidth ?? field?.minWidth;

	if (minWidth != null) {
		return minWidth as string;
	}

	if (option?.icon) {
		return getDensityValue();
	}

	return '100px';
}

function getMaxWidth(option: Option): string | number | undefined {
	const maxWidth = option?.maxWidth ?? field?.maxWidth;

	if (maxWidth != null) {
		return maxWidth as string;
	}

	return undefined;
}

function getWidth(option: Option): string | number | undefined {
	const width = option?.width ?? field?.width;

	if (width != null) {
		return width as string;
	}

	if (option?.icon) {
		return getDensityValue();
	}

	return 'fit-content';
}

function getHeight(option: Option): string | number | undefined {
	const height = option?.height ?? field?.height;

	if (height != null) {
		return height as string;
	}

	return getDensityValue();
}

const isActive = (val: string | number): boolean | undefined => {
	if (!modelValue.value) {
		return undefined;
	}

	return modelValue.value === val || (modelValue.value as string[]).includes(val as string);
};

// ------------------------- Variants //
const fieldVariant = ref<VSFButtonFieldProps['field']['variant']>(field?.variant);

function getVariant(val: string | number): VSFButtonFieldProps['field']['variant'] {
	if (isActive(val)) {
		return 'flat' as const;
	}

	return (fieldVariant.value ?? settings.value?.variant ?? 'tonal') as VSFButtonFieldProps['field']['variant'];
}


// -------------------------------------------------- Active Messages //
function activeMessages(errorMessage: string | string[]): boolean {
	if (errorMessage ? errorMessage.length > 0 : false) {
		return true;
	}

	if (field.hint && (field.persistentHint || isFocused.value)) {
		return true;
	}

	if (field.messages) {
		return true;
	}

	return false;
}

function fieldMessages(errorMessage?: string | string[]): string | string[] {
	if (errorMessage ? errorMessage.length > 0 : false) {
		return errorMessage as string[];
	}

	if (field.hint && (field.persistentHint || isFocused.value)) {
		return field.hint;
	}

	if (field.messages) {
		return field.messages;
	}

	return '';
}

const hasMessages = computed(() => field.messages && field.messages.length > 0);

const hasDetails = computed(() => {
	return !bindSettings.value.hideDetails || (
		bindSettings.value.hideDetails === 'auto' && hasMessages.value
	);
});


// -------------------------------------------------- Styles //
const gap = shallowRef(field.gap ?? 2);

const itemGroupStyle = computed<CSSProperties>(() => {
	if (containsSizeUnit(gap.value)) {
		return {
			'gap': `${gap.value}`,
		};
	}

	return {};
});


const buttontextcolor = ref('rgb(var(--v-theme-on-surface))');


// -------------------------------------------------- Classes //
const itemGroupClass = computed(() => {
	return {
		[`align-${field?.align}`]: field?.align != null && field?.block,
		[`justify-${field?.align}`]: field?.align != null && !field?.block,
		'd-flex': true,
		'flex-column': field?.block,
		[`ga-${gap.value}`]: !containsSizeUnit(gap.value),
	};
});

const buttonFieldContainerClass = computed(() => {
	return {
		'd-flex': field?.align,
		'flex-column': field?.align,
		'vsf-button-field__container': true,
		[`align-${field?.align}`]: field?.align,
	};
});

const buttonClass = computed(() => {
	const localDensity = fieldDensity.value as string;

	if (localDensity === 'expanded' || localDensity === 'oversized') {
		return {
			[`v-btn--density-${localDensity}`]: true,
		};
	}

	return {};
});

const getLabelClass = (option: Option): object => {
	const isActiveOption = isActive(option.value);
	const optionVariant = getVariant(option.value);
	const useBgColor = isActiveOption || optionVariant === 'flat' || optionVariant === 'elevated';

	return {
		[`bg-${option?.color}`]: useBgColor,
	};
};

// -------------------------------------------------- Focused //
const isFocused = shallowRef(null);

function onFocus(value: any) {
	isFocused.value = value;
}


// -------------------------------------------------- Helpers //
function containsSizeUnit(value: string | number): boolean {
	const sizeUnits = /(px|em|rem|vw|vh|vmin|vmax|%|pt|cm|mm|in|pc|ex|ch)$/;
	return sizeUnits.test(value as string);
}
</script>

<style lang="scss" scoped>
.v-item-group {
	flex-wrap: wrap;
}

.vsf-button-field {
	&__btn-label {
		color: v-bind(buttontextcolor);
	}
}
</style>
