/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { App, CSSProperties } from 'vue';
import type {
	VBtn,
	// VIcon,
	VStepper,
	VStepperItem,
	// VStepperActions,
	VStepperWindowItem,
} from 'vuetify/components';
import VStepperForm from '../VStepperForm.vue';
import type { Schema } from 'yup';
import type {
	GenericObject,
	FieldValidator,
	FormValidationResult,
} from 'vee-validate';



export * from '../index';

// -------------------------------------------------- Globals //
declare global {
	type ValidateAction = 'page' | 'blur' | 'change' | 'input' | 'submit' | 'click';
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
export type GlobalDensity = null | 'default' | 'comfortable' | 'compact';
export type GlobalVariant = 'filled' | 'underlined' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled';


// type VBtnVariants = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
// type VCheckboxVariants = null;
// type VRadioVariants = null;
// type VSwitchariants = null;

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




// -------------------------------------------------- Misc //
export interface KeyStringAny<T = any> {
	[key: string]: T;
};


export interface VStepperProps extends Pick<VStepper,
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
	'theme' |
	'tile' |
	'width'
> { }

interface VStepperWindowItemProps {
	transition?: VStepperWindowItem['transition'];
}

export interface SummaryColumns {
	sm?: number | string;
	md?: number | string;
	lg?: number | string;
	xl?: number | string;
}

// -------------------------------------------------- Field //
export interface Field {
	autoPage?: Props['autoPage'];
	autoPageDelay?: Props['autoPageDelay'];
	canReview?: Props['canReview'];
	color?: Props['color'];
	density?: Props['density'];
	disabled?: boolean | ((value: any) => boolean);
	error?: boolean;
	errorMessages?: string | string[];
	hideDetails?: GlobalHideDetails;
	hidden?: boolean;
	id?: string;
	items?: readonly any[] | undefined;
	label?: string;
	name: string;
	options?: KeyStringAny;
	required?: boolean | undefined;
	rules?: ValidationRule[];
	text?: string;
	type?: FieldTypes;
	validateOn?: string;
	when?: (value: any) => boolean;

	// ? Date Field //
	// dateFormat?: string;
	// dateSeparator?: string;

	// ? Checkboxes //
	inline?: boolean;
	inlineSpacing?: string;
	labelPositionLeft?: boolean;
}


// -------------------------------------------------- Page //
export interface Page {
	autoPage?: boolean;
	editable?: VStepperItem['editable'];
	error?: boolean;
	fields: Field[];
	isReview?: boolean;
	text?: string;
	title?: string;
}


// -------------------------------------------------- Props //
// TODO: Revert this back to the stupid way //
export interface Props extends /* @vue-ignore */ VStepperProps, VStepperWindowItemProps {
	// Required //
	pages: Page[];
	schema: Schema<any>;

	// Optional //
	autoPage?: boolean;
	autoPageDelay?: number;
	canReview?: boolean; // TODO: Determine a better prop name for canReview //
	color?: string | undefined; 						// * Vuetify Checked
	density?: GlobalDensity;								// * Vuetify Checked
	direction?: 'horizontal' | 'vertical';
	errorIcon?: VStepper['errorIcon'];
	hideDetails?: GlobalHideDetails;
	navButtonSize?: VBtn['size'];
	summaryColumns?: SummaryColumns;
	title?: string;
	validateOn?: Field['validateOn'];
	variant?: string;
	width?: string;
}

export interface PluginOptions extends Partial<Omit<Props, 'pages' | 'schema'>> { }
export interface Settings extends PluginOptions { }

type FieldTypes =
	'autocomplete' |
	'checkbox' |
	'color' |
	'combobox' |
	'custom' |
	'date' |
	'email' |
	'fancyRadio' |
	'file' |
	'hidden' |
	'number' |
	'password' |
	'radio' |
	'select' |
	// 'submit' | // ? Maybe
	'switch' |
	'tel' |
	'text' |
	'textField' |
	'textarea' |
	'url' |
	undefined;

export interface SharedProps {
	field: Field;
	settings: Settings;
}


// -------------------------------------------------- Validation //
type ValidationRule = {
	params?: string[];
	type?: string;
};

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
	): Promise<void>;
}


// -------------------------------------------------- Composables //
// ------------------------- Helpers //
export interface UseMergeProps {
	(
		A: Record<string, any>,
		B: PluginOptions,
		C: Props
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

// ------------------------- Styles //
export interface UseContainerStyle {
	(
		options: {
			displayType?: string;
		}
	): CSSProperties;
}


// -------------------------------------------------- Plugin Component //
declare module "vue" {
	interface ComponentCustomProperties { }

	interface GlobalComponents {
		VStepperForm: typeof VStepperForm;
	}
}

declare function createVStepperForm(options?: PluginOptions): {
	install: (app: App) => void;
};

export { createVStepperForm };
