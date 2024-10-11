<template>
	<div>
		<FieldLabel
			:label="field.label"
			:required="field.required"
		/>

		<div class="vsf-fancy-radio__container">
			<div class="v-input__control vsf-fancy-radio__control">
				<template
					v-for="option in field?.options"
					:key="option.value"
				>
					<div
						class="vsf-fancy-radio__field v-field"
						:class="{
							...fieldClasses,
							[`vsf-fancy-radio__field--variant-${fieldVariant}-focused`]: isFocused === option.value,
						}"
						:style="fieldStyle"
					>
						<input
							:id="`vsf-radio-${field.name}-${option.value}`"
							v-model="modelValue"
							class="vsf-fancy-radio__input"
							:class="{
								'vsf-fancy-radio__input_checked': modelValue === option.value,
							}"
							:name="field.name"
							type="radio"
							:value="option.value"
						/>

						<label
							:class="{
								...labelClasses,
								[`vsf-fancy-radio__label--variant-${fieldVariant}-focused`]: isFocused === option.value,
							}"
							:for="`vsf-radio-${field.name}-${option.value}`"
							:style="labelStyle"
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
				</template>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import type {
	VSFFancyRadioProps,
} from './index';
import FieldLabel from '../../shared/FieldLabel.vue';
import { useAutoPage } from '../../../composables/helpers';


const emit = defineEmits(['next']);

const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFFancyRadioProps>();

// console.log('field', field);


// Auto Paging //
useAutoPage({ emit, field, modelValue, settings });

// console.group('VSFFancyRadio');
// console.log('field', field);
// console.log('settings', settings);
// console.groupEnd();


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
		'min-height': fieldHeight.value,
	};

	return styles;
});

const labelStyle = computed<CSSProperties>(() => {
	const styles = {
		'min-width': '100px',
		'width': field?.width ?? '100px',
	};

	return styles;
});


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
		[`v-field--variant-${fieldVariant.value}`]: true,
		[`vsf-fancy-radio__field--variant-${fieldVariant.value}`]: true,
	};
});

const labelClasses = computed(() => {
	return {
		'pa-1': field?.density === 'compact',
		'pa-4': field?.density !== 'compact',
		'vsf-fancy-radio__label': true,
		[`vsf-fancy-radio__label--variant-${fieldVariant.value}`]: true,
		// [`vsf-fancy-radio__label-variant-${variant}_${isFocused.value}`]: true,
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
}
</style>

<style lang="scss" scoped>
.vsf-fancy-radio {
	&__container {
		align-items: center;
		display: flex;
		gap: 10px;
		height: fit-content;
		justify-content: center;
		position: relative;
	}

	&__control {
		gap: 10px;
		min-height: fit-content !important;
	}

	// -------------------------------------------------- Field //
	&__field {
		border-radius: var(--vsf-field-border-radius);
		grid-area: unset;
		min-height: fit-content !important;

		// ? -------------------------------------------------- Variants //
		&--variant {

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
		&--variant {
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
