<template>
	<div>
		<div
			:id="field?.groupId"
			class="vsf-fancy-radio__container"
		>
			<Field
				v-slot="{ errorMessage, validate }"
				v-model="modelValue"
				:name="field.name"
				type="radio"
				:validate-on-model-update="true"
			>
				<v-radio-group
					v-model="modelValue"
					class="vsf-fancy-radio__control"
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
					:theme="field?.theme"
				>
					<template #label>
						<FieldLabel
							:label="field.label"
							:required="fieldRequired"
						/>
					</template>

					<div
						v-for="option in field?.options"
						:key="option.value"
						class="vsf-fancy-radio__field v-field"
						:class="{
							...fieldClasses,
							[`vsf-fancy-radio__field-variant-${fieldVariant}-focused`]: isFocused === option.value,
						}"
						:style="fieldStyle"
					>
						<input
							:id="option?.id"
							v-model="modelValue"
							class="vsf-fancy-radio__input"
							:class="{
								'vsf-fancy-radio__input_checked': modelValue === option.value || (Array.isArray(modelValue) ? modelValue.includes(option.value) : false),
								'vsf-fancy-radio__input_error': hasErrors || errorMessage || field?.errorMessages,
							}"
							:disabled="(field.disabled as boolean)"
							:name="field.name"
							type="radio"
							:value="option.value"
							:width="field?.width"
							@blur="onActions(validate, 'blur')"
							@change="onActions(validate, 'change')"
							@input="onActions(validate, 'input')"
						/>

						<label
							:class="{
								...labelClasses,
								[`vsf-fancy-radio__label-variant-${fieldVariant}-focused`]: isFocused === option.value,
							}"
							:for="`vsf-radio-${field.name}-${option.value}`"
							:style="labelStyle"
							@click="onActions(validate, 'click', option.value)"
							@mousedown="onFocus(option.value)"
							@mouseleave="onFocus(null)"
							@mouseup="onFocus(null)"
						>
							<div :class="fieldOverlayClasses"></div>
							<div :class="fieldOutlineClasses"></div>
							<div
								:class="{
									...fieldTextClasses,
									'vsf-fancy-radio__input_selected': modelValue === option.value,
									'text-surface': modelValue === option.value && fieldColor === 'on-surface',
								}"
								v-html="option.label"
							></div>
						</label>
					</div>
				</v-radio-group>
			</Field>
		</div>

	</div>
</template>


<script lang="ts" setup>
import type { VSFFancyRadioProps } from './index';
import type { FieldLabelProps } from '../../shared/FieldLabel.vue';
import { useOnActions } from '../../../composables/validation';
import FieldLabel from '../../shared/FieldLabel.vue';
import { Field } from 'vee-validate';


const emit = defineEmits(['validate']);
const modelValue = defineModel<any>();
const props = defineProps<VSFFancyRadioProps>();

const { field, settings } = props;

const fieldRequired = computed(() => {
	const hasRequiredRule = field.rules?.find((rule) => rule.type === 'required');
	return field.required || hasRequiredRule as FieldLabelProps['required'];
});


if (modelValue?.value == null) {
	modelValue.value = field?.multiple ? [] : null;
}

// ------------------------- Validate On Actions //
async function onActions(validate: FieldValidateResult, action: ValidateAction, value?: unknown): Promise<void> {
	// TODO: Check the other validate on states //

	if (!field?.disabled && value) {
		if (field?.multiple) {
			if (modelValue.value.includes(value)) {
				const index = modelValue.value.indexOf(value);
				modelValue.value.splice(index, 1);
			}
			else {
				modelValue.value.push(value);
			}
		}
		else {
			modelValue.value = value;
		}
	}

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


// -------------------------------------------------- Properties //
const densityHeight = {
	comfortable: '48px',
	compact: '40px',
	default: '56px',
	expanded: '64px',
	oversized: '72px',
};

const fieldVariant = ref(field?.variant ?? 'filled');

const fieldColor = computed(() => {
	let colorAdjustment = field?.color ?? settings?.color;
	colorAdjustment = colorAdjustment === 'default' || colorAdjustment === 'surface' ? 'on-surface' : colorAdjustment;

	return colorAdjustment;
});

const fieldHeight = computed(() => {
	if (field?.height) {
		return field?.height;
	}

	return field?.density ? densityHeight[field?.density] : densityHeight['default'];
});

// -------------------------------------------------- Styles //
const fieldStyle = computed<CSSProperties>(() => {
	const styles = {
		'height': fieldHeight.value,
		'max-width': field?.maxWidth ?? '100%',
		'min-height': fieldHeight.value,
		'min-width': field.minWidth ?? 'fit-content',
		'width': field?.width ?? '100px',
	};

	return styles;
});

const labelStyle = computed<CSSProperties>(() => {
	const styles = {
		'min-width': '100px',
		'width': field?.minWidth ?? field?.maxWidth ?? field?.width ?? '100px',
	};

	return styles;
});


const gap = ref(field.gap ?? '10px');


// -------------------------------------------------- Classes //
const fieldOverlayClasses = computed(() => {
	return {
		'v-field__overlay': true,
		'vsf-fancy-radio__overlay': true,
		[`text-${fieldColor.value}`]: fieldColor.value,
	};
});

const fieldOutlineClasses = computed(() => {
	return {
		'v-field__outline': true,
		'vsf-fancy-radio__outline': true,
		[`text-${fieldColor.value}`]: fieldColor.value,
	};
});

const fieldTextClasses = computed(() => {
	const oppositeColorVariation = fieldColor.value === 'on-surface' ? 'surface' : fieldColor.value;

	return {
		'vsf-fancy-radio__text': true,
		[`text-${oppositeColorVariation}`]: fieldColor.value === 'on-surface',
	};
});

const fieldClasses = computed(() => {
	return {
		'vsf-fancy-radio__field-disabled': field?.disabled,
		'vsf-fancy-radio__field-flat': field?.flat,
		[`v-field--variant-${fieldVariant.value}`]: true,
		[`vsf-fancy-radio__field-variant-${fieldVariant.value}`]: true,
	};
});

const labelClasses = computed(() => {
	return {
		'pa-1': field?.density === 'compact',
		'pa-4': field?.density !== 'compact',
		'vsf-fancy-radio__label': true,
		[`vsf-fancy-radio__label-variant-${fieldVariant.value}`]: true,
	};
});


// -------------------------------------------------- Focused //
const isFocused = ref(null);

function onFocus(value: any) {
	isFocused.value = value;
}
</script>

<style>
:root {
	--vsf-field-border-radius: 4px;
	--vsf-field-border-opacity: 0.04;
	--vsf-field-disabled-opacity: 0.25;
}
</style>

<style lang="scss" scoped>
.vsf-fancy-radio {
	&__container {
		align-items: center;
		display: flex;
		height: fit-content;
		justify-content: center;
		position: relative;
	}

	&__control {
		gap: 10px;
		min-height: fit-content !important;
		min-width: fit-content !important;

		:deep(.v-input__control) {
			align-items: center;
			display: flex;
			justify-content: center;

			.v-selection-control-group {
				flex-direction: row !important;
				gap: v-bind(gap) !important;
				justify-content: center !important;
				padding-inline-start: 0 !important;
			}

			.v-label {
				margin-inline-start: 0 !important;
			}
		}

		:deep(.v-input__details) {
			.v-messages {
				align-items: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}

		&.v-input--vertical {
			display: flex;
			flex-direction: column;

			:deep(.v-input__control) {
				.v-selection-control-group {
					flex-direction: column !important;
				}
			}
		}
	}

	// -------------------------------------------------- Field //
	&__field {
		border-radius: var(--vsf-field-border-radius);
		display: block !important;
		flex-grow: unset;
		grid-area: unset;
		min-height: fit-content !important;

		&-disabled {
			.vsf-fancy-radio__overlay {
				opacity: var(--vsf-field-disabled-opacity) !important;
			}

			.vsf-fancy-radio__label {
				cursor: default !important;

				&:hover {
					.vsf-fancy-radio__overlay {
						opacity: var(--vsf-field-disabled-opacity) !important;
					}
				}
			}
		}

		&-flat {
			--vsf-field-border-radius: 0;
		}

		// ? -------------------------------------------------- Variants //
		&-variant {

			// ? ------------------------- Filled //
			&-filled {
				&:hover {
					--vsf-field-border-opacity: calc((0.04 + var(--v-hover-opacity)) * var(--v-theme-overlay-multiplier));
				}

				&-focused {
					--vsf-field-border-opacity: calc((0.04 + var(--v-focus-opacity)) * var(--v-theme-overlay-multiplier)) !important;
				}

				.vsf-fancy-radio__overlay {
					opacity: var(--vsf-field-border-opacity);
					transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
				}
			}
		}

		&.vsf-field__overlay {
			opacity: var(--vsf-field-border-opacity);
		}
	}

	// -------------------------------------------------- Text //
	&__text {
		align-items: stretch;
		contain: layout;
		display: flex;
		justify-content: center;
		left: 0;
		pointer-events: none;
		position: relative;
		right: 0;
		width: 100%;
	}

	.vsf-fancy-radio__overlay {
		background-color: rgb(var(--v-theme-surface));
	}

	// -------------------------------------------------- Input //
	&__input {
		display: none;

		&_checked {
			+ label {
				.vsf-fancy-radio__overlay {
					background-color: currentcolor;
					opacity: 1;
				}
			}
		}

		&_error {
			+ label {
				.vsf-fancy-radio__overlay {
					border-color: rgb(var(--v-theme-error));
					opacity: 1;
				}
			}
		}
	}

	// -------------------------------------------------- Label //
	&__label {
		align-items: center;
		border-radius: var(--vsf-field-border-radius);
		cursor: pointer;
		display: flex;
		justify-content: center;
		min-width: fit-content !important;
		position: relative;
		transition: background-color 0.3s, border-color 0.3s;

		// ? ------------------------- Underline scaling for variants //
		@mixin underline-scale() {
			.vsf-fancy-radio__outline {
				&::before {
					border-width: 0 0 var(--v-field-border-width);
				}

				&::after {
					border-width: 0 0 2px;
					transform: scaleX(0);
				}
			}

			&-focused {
				.vsf-fancy-radio__outline {
					&::after {
						transform: scaleX(1);
					}
				}
			}
		}

		// ? -------------------------------------------------- Variants //
		&-variant {
			// ? ------------------------- Filled //
			&-filled {
				border-radius: var(--vsf-field-border-radius) var(--vsf-field-border-radius) 0 0;

				@include underline-scale();
			}

			// ? ------------------------- Outlined //
			&-outlined {
				--v-field-border-width: 2px;

				&:hover {
					--v-field-border-width: 2px;

					.vsf-fancy-radio__overlay {
						opacity: 1 !important;
					}
				}

				.vsf-fancy-radio__overlay {
					border-radius: var(--vsf-field-border-radius) !important;
					border-style: solid;
					border-width: var(--v-field-border-width);
					opacity: 0.38;
					transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
				}
			}

			// ? ------------------------- Underlined //
			&-underlined {
				border-radius: var(--vsf-field-border-radius) var(--vsf-field-border-radius) 0 0;

				@include underline-scale();
			}
		}
	}
}
</style>
