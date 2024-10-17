/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { App, CSSProperties } from 'vue';
import type {
	VBtn,
	// VCard,
	VCheckbox,
	// VIcon,
	VRadio,
	VSelect,
	VStepper,
	VStepperItem,
	// VStepperActions,
	VStepperWindowItem,
	VSwitch,
	VTextField,
	VTextarea,
} from 'vuetify/components';
import VStepperForm from '../VStepperForm.vue';
import type {
	PrivateFormContext,
} from 'vee-validate';
import type { AnySchema } from 'yup';



export * from '../index';


// -------------------------------------------------- Types //
export type GlobalDensity = VCheckbox['density'] | VSelect['density'] | VSwitch['density'] | VTextField['density'] | VTextarea['density'] | VRadio['density'];

// -------------------------------------------------- Misc //
export interface KeyStringAny<T = any> {
	[key: string]: T;
};




// ! TS Issue with this, possible bug makes it not work ! //
// export interface VStepperProps extends Pick<VStepper,
// 	'altLabels' |
// 	'bgColor' |
// 	'border' |
// 	'disabled' |
// 	'editable' |
// 	'editIcon' |
// 	'nextText' |
// 	'prevText' |
// 	'rounded' |
// 	'width'
// > { }

export interface VStepperProps {
	altLabels?: VStepper['altLabels'];
	bgColor?: VStepper['bgColor'];
	border?: VStepper['border'];
	disabled?: VStepper['disabled'];
	editIcon?: VStepper['editIcon'];
	editable?: VStepper['editable'];
	elevation?: VStepper['elevation'];
	flat?: VStepper['flat'];
	height?: VStepper['height'];
	hideActions?: VStepper['hideActions'];
	maxHeight?: VStepper['maxHeight'];
	maxWidth?: VStepper['maxWidth'];
	minHeight?: VStepper['minHeight'];
	minWidth?: VStepper['minWidth'];
	nextText?: VStepper['nextText'];
	prevText?: VStepper['prevText'];
	rounded?: VStepper['rounded'];
	selectedClass?: VStepper['selectedClass'];
	theme?: VStepper['theme'];
	tile?: VStepper['tile'];
	width?: VStepper['width'];
}

interface VStepperWindowItemProps {
	transition?: VStepperWindowItem['transition'];
}

export interface SummaryColumns {
	sm?: number | string;
	md?: number | string;
	lg?: number | string;
	xl?: number | string;
}


// -------------------------------------------------- Props //
export interface Props extends VStepperProps, VStepperWindowItemProps {
	// Required //
	pages: Page[];

	// Optional //
	autoPage?: boolean;
	autoPageDelay?: number;
	// TODO: Determine a better prop name for canReview //
	canReview?: boolean;
	color?: string;
	density?: GlobalDensity;
	direction?: 'horizontal' | 'vertical';
	errorIcon?: VStepper['errorIcon'];
	hideDetails?: boolean;
	navButtonSize?: VBtn['size'];
	summaryColumns?: SummaryColumns;
	title?: string;
	validateOn?: Field['validateOn'];
	variant?: string;
	width?: string;
}

export interface PluginOptions extends Partial<Props> { }
export interface Settings extends Partial<Omit<Props, 'pages'>> { }

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

type ValidationTypes = 'mixed' | 'string' | 'number' | 'boolean' | 'date' | 'array' | 'tuple' | 'object' | undefined;


// -------------------------------------------------- Components //
export interface SharedProps {
	field: Field;
	settings: Settings;
}

// TODO: Need to remove the "type" for some fields as they are not valid field types //
export interface Field {
	autoPage?: Props['autoPage'];
	autoPageDelay?: Props['autoPageDelay'];
	canReview?: Props['canReview'];
	color?: Props['color'];
	density?: Props['density'];
	disabled?: boolean | ((value: any) => boolean);
	error?: boolean;
	hidden?: boolean;
	label?: string;
	name: string;
	options?: KeyStringAny;
	required?: boolean | undefined;
	rules?: ValidationRule[];
	text?: string;
	type?: FieldTypes;
	validate?: (field: Field, value: any) => boolean;
	validateOn?: string;
	validationType?: ValidationTypes;
	when?: (value: any) => boolean;

	// ? Date Field //
	// dateFormat?: string;
	// dateSeparator?: string;

	// ? Checkboxes //
	inline?: boolean;
	inlineSpacing?: string;
	labelPositionLeft?: boolean;
}


export interface Page {
	autoPage?: boolean;
	editable?: VStepperItem['editable'];
	error?: boolean;
	fields: Field[];
	isReview?: boolean;
	text?: string;
	title?: string;
}


// -------------------------------------------------- Validation //
type ValidationRule = {
	params?: string[];
	type?: string;
};

export type YupObjectShape = { [key: string]: AnySchema; };

// ------------------------- Trigger Validation Event Bus //
export type TriggerValidation = any;
export type ParentPageValidation = any;


// -------------------------------------------------- Composables //
// ------------------------- Helpers //
export interface UseConvertToUnit {
	(
		options: {
			unit?: string,
			value: string | number,
		}
	): string | void;
}


export interface UseMergeProps {
	(
		A: Record<string, any>,
		B: Omit<Props, 'pages'>,
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


// ------------------------- Validation //
export interface SchemaField extends Field {
	validationType: Field['validationType'],
	validationTypeError: any,
}

export interface UseGetValidationSchema {
	(
		fields: SchemaField[],
	): any;
}

export type ValidateAction = 'page' | 'blur' | 'change' | 'input' | 'submit';


export type EmitValidateEventPayload = {
	action: ValidateAction;
	error: Field['error'];
	errors: Record<string, any>;
	fieldName: Field['name'];
	fieldType: Field['type'];
	nextPage: boolean;
	pageIndex: number;
};

// Corrected function type for emitting the 'validate:page' event
export type EmitValidateEvent = (event: 'validate', payload: EmitValidateEventPayload) => void;
export interface UseOnActionsResponse {
	field: Field;
	results: any;
	shouldValidate: boolean;
}

export interface UseOnActions {
	(
		options: {
			action: ValidateAction;
			emit: EmitValidateEvent;
			field: Field;
			localForm: PrivateFormContext | null;
			pageIndex: number;
			validateOn?: Props['validateOn'];
		}
	): Promise<UseOnActionsResponse>;
}

export interface UseCheckIfFieldHasErrors {
	(
		options: {
			action: ValidateAction;
			emit: EmitValidateEvent;
			field: Field;
			pageIndex: number;
			results: any;
		}
	): Field;
}


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
