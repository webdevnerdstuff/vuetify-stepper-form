
import { App } from 'vue';
import type {
	FieldValidator,
	FormValidationResult,
	GenericObject,
} from 'vee-validate';
import type {
	VBtn,
	// VIcon,
	VStepper,
	VStepperItem,
	// VStepperActions,
	VStepperWindowItem,
	VTooltip,
} from 'vuetify/components';
import type { ValidationRule } from 'vuetify/composables/validation';
import type { Schema } from 'yup';
import type { ZodSchema } from 'zod';
import VStepperForm from '../VStepperForm.vue';


export * from '../index';

// -------------------------------------------------- Globals //
declare global {
	interface KeyStringAny<T = any> {
		[key: string]: T;
	}

	type ValidateAction =
		'blur' |
		'change' |
		'click' |
		'input' |
		'page' |
		'submit';
	type ValidateFieldResult = FieldValidator<GenericObject>;
	type ValidateResult = FormValidationResult<GenericObject, GenericObject>;
	type FieldValidateResult = () => Promise<Partial<FieldValidator<GenericObject>>>;
}

/* Good for:
	* VAutocomplete
	* VCheckbox
	* VColorField
	* VCombobox
	* VFancyRadio
	* VFileInput
	* VRadio
	* VSelect
	* VSwitch
	* VTextField
	* VTextarea
*/
export type GlobalDensity = null | 'default' | 'comfortable' | 'compact' | 'expanded' | 'oversized';
export type GlobalVariant = 'filled' | 'underlined' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled';


// type VBtnVariants = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
// type VCheckboxVariants = null;
// type VRadioVariants = null;
// type VSwitchVariants = null;

/* Good for:
	* VAutocomplete
	* VCheckbox
	* VCombobox
	* VColorField
	// * VFancyRadio
	* VFileInput
	* VSelect
	* VSwitch
	* VRadioGroup
	* VTextarea
	* VTextField
*/
export type GlobalHideDetails = boolean | 'auto' | undefined;

export type GlobalClosableChips = boolean;
export type GlobalCloseText = string;
export type GlobalChips = boolean;
export type GlobalMultiple = boolean;


export interface VStepperProps extends Partial<Pick<VStepper,
	'altLabels' |
	'bgColor' |
	'border' |
	'disabled' |
	'editIcon' |
	'editable' |
	'elevation' |
	'flat' |
	'height' |
	'hideActions' |
	'maxHeight' |
	'maxWidth' |
	'minHeight' |
	'minWidth' |
	'nextText' |
	'prevText' |
	'rounded' |
	'selectedClass' |
	'tag' |
	'theme' |
	'tile' |
	'width'
>> { }

interface VStepperWindowItemProps {
	transition?: VStepperWindowItem['transition'];
}

export interface ResponsiveColumns {
	sm?: number | string;
	md?: number | string;
	lg?: number | string;
	xl?: number | string;
}

// -------------------------------------------------- Field //
export interface Field {
	autoPage?: Props['autoPage'];
	autoPageDelay?: Props['autoPageDelay'];
	class?: string;
	color?: Props['color'];
	columns?: Props['fieldColumns'];
	density?: GlobalDensity;
	disabled?: boolean | ((value: any) => boolean);
	error?: boolean;
	errorMessages?: string | string[];
	hidden?: boolean;
	hideDetails?: GlobalHideDetails;
	id?: string;
	inline?: boolean; 															// ? Checkboxes //
	inlineSpacing?: string; 												// ? Checkboxes //
	items?: readonly any[] | undefined;
	label?: string;
	labelPositionLeft?: boolean; 										// ? Checkboxes //
	name: string;
	options?: KeyStringAny;
	required?: boolean | undefined;
	rules?: ValidationRule;
	text?: string;
	type?: FieldTypes;
	validateOn?: 'blur' | 'change' | 'click' | 'input';
	when?: (value: any) => boolean;

	// ? Date Field //
	// dateFormat?: string;
	// dateSeparator?: string;
}


// -------------------------------------------------- Page //
export interface Page {
	autoPage?: boolean;
	editable?: VStepperItem['editable'];
	error?: boolean;
	fields?: Field[];
	isReview?: boolean;
	pageFieldColumns?: ResponsiveColumns;
	text?: string;
	title?: string;
	visible?: boolean;
	when?: (value: any) => boolean;
}


// -------------------------------------------------- Props //
export interface Props extends /* @vue-ignore */ VStepperProps, VStepperWindowItemProps {
	// Required //
	pages: Page[];
	validationSchema?: Schema<any> | ZodSchema;

	// Optional //
	autoPage?: boolean;
	autoPageDelay?: number;
	color?: string | undefined;
	density?: GlobalDensity;
	direction?: 'horizontal' | 'vertical';
	errorIcon?: VStepperItem['errorIcon'];
	fieldColumns?: ResponsiveColumns | undefined;
	headerTooltips?: boolean;
	hideDetails?: GlobalHideDetails;
	keepValuesOnUnmount?: boolean,
	navButtonSize?: VBtn['size'];
	summaryColumns?: ResponsiveColumns;
	title?: string;
	tooltipLocation?: VTooltip['location'];
	tooltipOffset?: VTooltip['offset'];
	tooltipTransition?: VTooltip['transition'];
	validateOn?: Field['validateOn'];
	validateOnMount?: boolean;
	variant?: string;
	width?: string;
}

export interface PluginOptions extends Partial<Omit<Props, 'pages' | 'validationSchema'>> { }

declare global {
	export interface Settings extends PluginOptions { }
}

type FieldTypes =
	'autocomplete' |
	'buttons' |
	'checkbox' |
	'color' |
	'combobox' |
	'date' |
	'email' |
	'fancyRadio' |
	'field' |
	'file' |
	'hidden' |
	'number' |
	'password' |
	'radio' |
	'select' |
	'switch' |
	'tel' |
	'text' |
	'textField' |
	'textarea' |
	'url' |
	undefined;

export interface SharedProps {
	field: Field;
}


// -------------------------------------------------- Validation //
export type EmitValidateEvent = (event: 'validate', field: Field) => void;

export interface UseOnActions {
	(
		options: {
			action: ValidateAction;
			emit: EmitValidateEvent;
			field: Field;
			settingsValidateOn: Settings['validateOn'];
			validate: FieldValidateResult;
		}
	): Promise<ValidateResult>;
}


// -------------------------------------------------- Composables //
// ------------------------- Helpers //
export interface UseBuildSettings {
	(
		props: Settings,
	): Settings;
}
// ------------------------- Helpers //
export interface UseDeepMerge {
	(
		A: Record<string, any>,
		B: Record<string, any>,
		C: Record<string, any>
	): Record<string, any>;
}

export interface UseAutoPage {
	(
		options: {
			emit: {
				(e: 'next', field: Field): void;
			},
			field: Field;
			modelValue: any;
			settings: Settings;
		}
	): void;
}

export interface UseColumnErrorCheck {
	(
		options: {
			columns: ResponsiveColumns | undefined;
			propName?: string;
		}
	): void;
}


// ------------------------- Classes //
export type ComputedClasses = Record<string, boolean>;

export interface UseContainerClasses {
	(
		options: {
			direction?: Props['direction'];
		}
	): ComputedClasses;
}

export interface UseStepperContainerClasses {
	(
		options: {
			direction?: Props['direction'];
		}
	): ComputedClasses;
}

export interface UseColumnClasses {
	(
		options: {
			columnsMerged: ResponsiveColumns;
			fieldColumns?: ResponsiveColumns | undefined;
			propName?: string;
		}
	): ComputedClasses;
}


// -------------------------------------------------- Plugin Component //
declare module 'vue' {
	interface ComponentCustomProperties { }

	interface GlobalComponents {
		VStepperForm: typeof VStepperForm;
	}
}

declare function createVStepperForm(options?: PluginOptions): {
	install: (app: App) => void;
};

export { createVStepperForm };
