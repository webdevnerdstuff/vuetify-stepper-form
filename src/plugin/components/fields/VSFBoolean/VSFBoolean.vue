<template>
	<div>
		<FieldLabel
			:label="field.label"
			:required="field.required"
		/>


		<div class="vsf-boolean__container mb-10">
			<template
				v-for="option in field?.options"
				:key="option.value"
			>
				<input
					:id="`vsf-radio-${field.name}-${option.value}`"
					v-model="modelValue"
					class="vsf-boolean__input"
					:class="{
						'vsf-boolean__input_checked': modelValue === option.value,
					}"
					:name="field.name"
					type="radio"
					:value="option.value"
				/>

				<label
					:class="{
						...labelClasses,
						'vsf-boolean__label_variant_focused': isFocused === option.value,
					}"
					:for="`vsf-radio-${field.name}-${option.value}`"
					:style="labelStyle"
				>
					<div class="vsf-boolean__overlay v-field__overlay"></div>
					<div class="vsf-boolean__outline v-field__outline text-primary"></div>
					{{ option.label }}
				</label>
			</template>
		</div>

		<div class="vsf-boolean__container">
			<div
				class="v-input__control vsf-boolean__control"
				:style="controlStyle"
			>
				<template
					v-for="option in field?.options"
					:key="option.value"
				>
					<div
						class="vsf-boolean__field v-field"
						:class="fieldClasses"
					>
						<input
							:id="`vsf-radio-${field.name}-${option.value}`"
							v-model="modelValue"
							class="vsf-boolean__input"
							:class="{
								'vsf-boolean__input_checked': modelValue === option.value,
							}"
							:name="field.name"
							type="radio"
							:value="option.value"
						/>

						<!-- 'vsf-boolean__label_variant_focused': isFocused === option.value, -->
						<label
							:class="{
								...labelClasses,
							}"
							:for="`vsf-radio-${field.name}-${option.value}`"
							:style="labelStyle"
						>
							<!-- @mousedown="onFocus($event, option.value)"
							@mouseleave="onFocus($event, null)"
							@mouseup="onFocus($event, null)" -->
							<div :class="fieldOverlayClasses"></div>
							<div :class="fieldOutlineClasses"></div>
							<div class="vsf-boolean__text">{{ option.label }}</div>

						</label>


					</div>
				</template>



			</div>
		</div>
	</div>
	<div class="v-field  v-field--variant-filled mt-10">
		<div class="v-field__overlay"></div>
		<div class="v-field__loader">
			<div
				aria-hidden="true"
				aria-valuemax="100"
				aria-valuemin="0"
				class="v-progress-linear v-theme--dark v-locale--is-ltr"
				role="progressbar"
				style=" height: 0;top: 0; --v-progress-linear-height: 2px;"
			>
				<div class="v-progress-linear__background bg-primary"></div>
				<div
					class="v-progress-linear__buffer bg-primary"
					style="width: 0%;"
				></div>
				<div class="v-progress-linear__indeterminate">
					<div class="v-progress-linear__indeterminate long bg-primary"></div>
					<div class="v-progress-linear__indeterminate short bg-primary"></div>
				</div>
			</div>
		</div>
		<div
			class="v-field__field"
			data-no-activator=""
		>
		</div>
		<div class="v-field__outline">

		</div>
	</div>

</template>


<script lang="ts" setup>
import type {
	VSFBooleanProps,
} from './index';
import FieldLabel from '@/plugin/components/shared/FieldLabel.vue';


const modelValue = defineModel<any>();
const { field, settings } = defineProps<VSFBooleanProps>();


console.group('VSFBoolean');
console.log('field', field);
console.log('settings', settings);
console.groupEnd();


const densityHeight = {
	comfortable: '48px',
	compact: '40px',
	default: '56px',
	expanded: '64px',
	oversized: '72px',
};


const fieldHeight = computed(() => {
	if (field?.height) {
		return field?.height;
	}

	return field?.density ? densityHeight[field?.density] : densityHeight['default'];
});

const controlStyle = computed<CSSProperties>(() => {
	const styles = {
		'height': fieldHeight.value,
		'min-height': fieldHeight.value,
	};

	return styles;
});

const fieldOverlayClasses = computed(() => {
	return {
		'v-field__overlay': true,
		'vsf-boolean__overlay': true,
		[`text-${field?.color}`]: field?.color,
	};
});

const fieldOutlineClasses = computed(() => {
	return {
		'v-field__outline': true,
		'vsf-boolean__outline': true,
		[`text-${field?.color}`]: field?.color,
	};
});


const fieldClasses = computed(() => {
	return {
		[`v-field--variant-${field?.variant ?? 'filled'}`]: true,
		[`vsf-boolean__field--variant-${field?.variant ?? 'filled'}`]: true,
	};
});


const labelClasses = computed(() => {
	// const variant = field?.variant || 'filled';

	return {
		'pa-4': true,
		'vsf-boolean__label': true,
		// [`vsf-boolean__label_variant_${variant}`]: true,
		// [`vsf-boolean__label_variant_${variant}_${isFocused.value}`]: true,
	};
});

const labelStyle = computed<CSSProperties>(() => {
	const styles = {
		// 'background-color': field?.color ? `rgb(var(--v-theme-${field?.color}))` : undefined,
		// 'border-color': field?.color ? `rgb(var(--v-theme-${field?.color}))` : undefined,
		// 'border-style': 'solid',
		// 'border-width': '1px',
		'min-width': '100px',
		'width': field?.width ?? '100px',
	};

	console.log('styles', styles);

	return styles;
});

const isFocused = ref(null);


// function onFocus(event: FocusEvent, value: any) {
// 	console.log('onFocus', value);
// 	console.log('onFocus', event);
// 	isFocused.value = value;
// }
</script>

<style>
:root {
	--vsf-field-border-radius: 4px;
	--vsf-field-border-opacity: 0.04;
}
</style>

<style lang="scss" scoped>
.vsf-boolean {
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

	&__field {
		border-radius: var(--vsf-field-border-radius);
		grid-area: unset;
		min-height: fit-content !important;


		&--variant {
			--vsf-field-border-opacity: 0.38;

			&-filled {
				.vsf-boolean__overlay {
					border-radius: var(--vsf-field-border-radius) var(--vsf-field-border-radius) 0 0;
					opacity: var(--vsf-field-border-opacity);
					transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
				}
			}

			&-outlined {
				--v-field-border-width: 1px;

				&:hover {
					.vsf-boolean__overlay {
						opacity: 1;
					}
				}

				.vsf-boolean__overlay {
					border: 0 solid currentcolor;
					border-color: currentcolor;
					border-radius: var(--vsf-field-border-radius) !important;
					border-style: solid;
					border-width: var(--v-field-border-width);
					opacity: var(--vsf-field-border-opacity);
					transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
				}
			}
		}

		&.vsf-field__overlay {
			opacity: var(--vsf-field-border-opacity);
		}
	}


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

	.vsf-boolean__overlay {
		background-color: rgb(var(--v-theme-surface));
	}

	&__input {
		display: none;

		&_checked {
			+ label {
				.vsf-boolean__overlay {
					background-color: currentcolor;
					opacity: 1;
				}
			}
		}
	}

	// &__overlay {
	// 	background-color: currentcolor;
	// }

	&__label {
		align-items: center;
		cursor: pointer;
		display: flex;
		justify-content: center;
		min-width: fit-content !important;
		position: relative;
		transition: background-color 0.3s, border-color 0.3s, opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);

		// &_variant {
		// 	&_filled {
		// 		// border-bottom: 1px solid rgb(var(--v-theme-on-surface));
		// 		border-top-left-radius: 4px;
		// 		border-top-right-radius: 4px;

		// 		&:hover {
		// 			// border-bottom: 1px solid rgb(var(--v-theme-primary));
		// 			// border-color: #999;

		// 			/* Hover effect */
		// 			.v-field__overlay {
		// 				opacity: calc((0.04 + var(--v-hover-opacity)) * var(--v-theme-overlay-multiplier));
		// 			}
		// 		}

		// 		// &:active {
		// 		// 	border-bottom: 1px solid rgb(var(--v-theme-primary));
		// 		// }

		// 		.v-field__overlay {
		// 			background-color: rgb(var(--v-theme-on-surface));
		// 			opacity: 0.04;
		// 		}
		// 	}

		// 	&_focused {
		// 		.v-field__overlay {
		// 			opacity: calc((0.04 + var(--v-focus-opacity)) * var(--v-theme-overlay-multiplier)) !important;
		// 		}
		// 	}
		// }
	}

	// &__outline {
	// 	--v-field-border-width: 1px;
	// 	--v-field-border-opacity: 0.38;

	// 	align-items: stretch;
	// 	contain: layout;
	// 	display: flex;
	// 	height: 100%;
	// 	left: 0;
	// 	pointer-events: none;
	// 	position: absolute;
	// 	right: 0;
	// 	width: 100%;

	// 	// border-bottom: 1px;
	// 	// color: rgb(var(--v-theme-on-surface));
	// 	&::before,
	// 	&::after {
	// 		content: '';
	// 		height: 100%;
	// 		left: 0;
	// 		position: absolute;
	// 		top: 0;
	// 		width: 100%;
	// 	}

	// 	&:hover {
	// 		border-color: #f00;


	// 		&::before {
	// 			border-color: currentcolor;
	// 			border-style: solid;
	// 			border-width: 0 0 var(--v-field-border-width);
	// 			opacity: var(--v-field-border-opacity);
	// 			transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
	// 		}

	// 		&::after {
	// 			transform: scaleX(1);
	// 		}
	// 	}
	// }
}
</style>
