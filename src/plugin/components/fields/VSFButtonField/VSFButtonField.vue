<template>
	<div :class="buttonFieldContainerClass">
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
			:data-cy="`vsf-field-group-${field.name}`"
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
						:class="{ ...buttonClass, ...buttonClassAdditional(option) }"
						:color="option?.color || field?.color || settings?.color"
						:data-cy="`vsf-field-${field.name}`"
						:density="fieldDensity"
						:height="getHeight(option)"
						:icon="getIcon(option, 'icon')"
						:maxHeight="getMaxHeight(option)"
						:maxWidth="getMaxWidth(option)"
						:minHeight="getMinHeight(option)"
						:minWidth="getMinWidth(option)"
						:prependIcon="getIcon(option, 'prependIcon')"
						:value="option.value"
						:variant="getVariant(option.value)"
						:width="getWidth(option)"
						@click.prevent="onActions('click', option.value)"
						@keydown.space.prevent="onActions('click', option.value)"
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
				data-cy="vsf-field-messages"
				:messages="fieldMessages(errorMessage)"
			>
			</VMessages>
		</div>
	</div>

	<input
		v-model="value"
		data-cy="vsf-button-field-input"
		:name="field.name"
		type="hidden"
		@change="handleChange"
	/>
</template>


<script lang="ts" setup>
import { useField } from 'vee-validate';
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

const { field } = toRefs(props);
const settings = inject<Ref<Settings>>('settings')!;

const fieldRequired = computed<FieldLabelProps['required']>(() => {
	return field.value.required || false;
});
const fieldValidateOn = computed(() => field.value?.validateOn ?? settings.value?.validateOn);
const originalValue = modelValue.value;


const { errorMessage, handleChange, setValue, validate, value } = useField(
	field.value.name,
	undefined,
	{
		initialValue: field.value?.multiple ? [] : null,
		validateOnBlur: fieldValidateOn.value === 'blur',
		validateOnChange: fieldValidateOn.value === 'change',
		validateOnInput: fieldValidateOn.value === 'input',
		validateOnModelUpdate: fieldValidateOn.value != null,
	},
);


onUnmounted(() => {
	if (!settings.value?.keepValuesOnUnmount) {
		modelValue.value = originalValue;
		setValue(originalValue);
	}
});


const currentValue = ref(modelValue.value);

// ------------------------- Validate On Actions //
async function onActions(action: ValidateAction, val?: string | number): Promise<void> {
	if (currentValue.value === val && (fieldValidateOn.value === 'change' || fieldValidateOn.value === 'input')) {
		return;
	}

	if (!field.value?.disabled && value.value) {
		let updatedValue: string | string[];

		if (field.value?.multiple) {
			const localModelValue = Array.isArray(value.value) ? value.value.slice() : [];
			const valStr = String(val);

			if (localModelValue.includes(valStr)) {
				localModelValue.splice(localModelValue.indexOf(valStr), 1);
			}
			else {
				localModelValue.push(valStr);
			}

			updatedValue = localModelValue;
		}
		else {
			updatedValue = val as string;
		}

		setValue(updatedValue);
		modelValue.value = updatedValue;
	}
	else {
		setValue(val);
		modelValue.value = val;
	}

	await useOnActions({
		action,
		emit,
		field: field.value,
		settingsValidateOn: settings.value?.validateOn,
		validate,
	}).then(() => {
		currentValue.value = value.value;
	})
		.catch((error: Error) => {
			console.error(error);
		});
}


// -------------------------------------------------- Bound Settings //
const bindSettings = computed(() => ({
	...field.value,
	border: field.value?.border ? `${field.value?.color} ${field.value?.border}` : undefined,
	color: field.value.color || settings.value?.color,
	density: field.value?.density ?? settings.value?.density as VBtn['density'],
	hideDetails: field.value.hideDetails || settings.value?.hideDetails,
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

	return field.value?.id ? `${field.value?.id}-${key}` : undefined;
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

const fieldDensity = computed<VBtn['density']>(() => (field.value?.density ?? settings.value?.density) as VBtn['density']);

function getDensityValue(): string {
	return fieldDensity.value ? densityValues[fieldDensity.value] : densityValues['default'];
}

function getMinWidth(option: Option): string | number | undefined {
	const minWidth = option?.minWidth ?? field.value?.minWidth;

	if (minWidth != null) {
		return minWidth as string;
	}

	if (option?.icon || field.value?.icon) {
		return getDensityValue();
	}

	return '100px';
}

function getMaxWidth(option: Option): string | number | undefined {
	const maxWidth = option?.maxWidth ?? field.value?.maxWidth;

	if (maxWidth != null) {
		return maxWidth as string;
	}

	if (option?.icon || field.value?.icon) {
		return getDensityValue();
	}

	return undefined;
}

function getMinHeight(option: Option): string | number | undefined {
	const minHeight = option?.minHeight ?? field.value?.minHeight;

	if (minHeight != null) {
		return minHeight as string;
	}

	if (option?.icon || field.value?.icon) {
		return getDensityValue();
	}

	return undefined;
}

function getMaxHeight(option: Option): string | number | undefined {
	const maxHeight = option?.maxHeight ?? field.value?.maxHeight;

	if (maxHeight != null) {
		return maxHeight as string;
	}

	return undefined;
}

function getWidth(option: Option): string | number | undefined {
	const width = option?.width ?? field.value?.width;

	if (width != null) {
		return width as string;
	}

	if (option?.icon) {
		return getDensityValue();
	}

	return 'fit-content';
}

function getHeight(option: Option): string | number | undefined {
	const height = option?.height ?? field.value?.height;

	if (height != null) {
		return height as string;
	}

	return getDensityValue();
}

const isActive = (val: string | number): boolean | undefined => {
	if (!value.value) {
		return undefined;
	}

	return value.value === val || (value.value as string[]).includes(val as string);
};

// ------------------------- Variants //
const fieldVariant = ref<VSFButtonFieldProps['field']['variant']>(field.value?.variant);

function getVariant(val: string | number): VSFButtonFieldProps['field']['variant'] {
	if (isActive(val)) {
		return 'flat' as const;
	}

	return (fieldVariant.value ?? settings.value?.variant ?? 'tonal') as VSFButtonFieldProps['field']['variant'];
}


// -------------------------------------------------- Active Messages //
function activeMessages(errorMsg: string | string[]): boolean {
	if (errorMsg ? errorMsg.length > 0 : false) {
		return true;
	}

	if (field.value.hint && (field.value.persistentHint || isFocused.value)) {
		return true;
	}

	if (field.value.messages) {
		return true;
	}

	return false;
}

function fieldMessages(errorMsg?: string | string[]): string | string[] {
	if (errorMsg ? errorMsg.length > 0 : false) {
		return errorMsg as string[];
	}

	if (field.value.hint && (field.value.persistentHint || isFocused.value)) {
		return field.value.hint;
	}

	if (field.value.messages) {
		return field.value.messages;
	}

	return '';
}

const hasMessages = computed(() => field.value.messages && field.value.messages.length > 0);

const hasDetails = computed(() => {
	return !bindSettings.value.hideDetails || (
		bindSettings.value.hideDetails === 'auto' && hasMessages.value
	);
});


// -------------------------------------------------- Styles //
const gap = shallowRef(field.value.gap ?? 2);

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
		[`align-${field.value?.align}`]: field.value?.align != null && field.value?.block,
		[`justify-${field.value?.align}`]: field.value?.align != null && !field.value?.block,
		'd-flex': true,
		'flex-column': field.value?.block,
		[`ga-${gap.value}`]: !containsSizeUnit(gap.value),
	};
});

const buttonFieldContainerClass = computed(() => {
	return {
		'd-flex': field.value?.align,
		'flex-column': field.value?.align,
		'v-input--error': errorMessage ? errorMessage?.length > 0 : false,
		'vsf-button-field__container': true,
		[`align-${field.value?.align}`]: field.value?.align,
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

const buttonClassAdditional = (option: Option) => {
	return {
		[`${option?.class}`]: true,
		[`${field.value.selectedClass}`]: isActive(option.value) && field.value.selectedClass != null,
	};
};

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
