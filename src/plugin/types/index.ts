/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { CSSProperties } from 'vue';
import type {
	// VBtn,
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


export * from '../index';


// -------------------------------------------------- Types //
export type GlobalDensity = VCheckbox['density'] | VSelect['density'] | VSwitch['density'] | VTextField['density'] | VTextarea['density'] | VRadio['density'];

// -------------------------------------------------- Misc //
export interface KeyStringAny<T = any> {
	[key: string]: T;
};


// TODO: Need to remove the "type" for some fields as they are not valid field types //
export interface Field {
	// Required //
	name: string;

	// Optional //
	color?: string;
	dateFormat?: string;
	dateSeparator?: string;
	density?: GlobalDensity;
	disabled?: boolean | ((value: any) => boolean);
	error?: boolean;
	hidden?: boolean;
	label?: string;
	options?: KeyStringAny;
	required?: boolean | undefined;
	text?: string;
	type?: 'autocomplete' |
	'checkbox' |
	'color' |
	'combobox' |
	'custom' |
	'email' |
	'fancyRadio' |
	'file' |
	'hidden' |
	'number' |
	'password' |
	'radio' |
	'select' |
	'submit' |
	'switch' |
	'tel' |
	'text' |
	'textField' |
	'textarea' |
	'url' |
	undefined;
	when?: (value: any) => boolean;
	validate?: (field: Field, value: any) => boolean;
	validateOn?: string;

	inline?: boolean; 							// ? Checkboxes
	inlineSpacing?: string;					// ? Checkboxes
	labelPositionLeft?: boolean;		// ? Checkboxes
}


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


// -------------------------------------------------- Props //
export interface Props extends VStepperProps, VStepperWindowItemProps {
	// Required //
	pages: Page[];

	// Optional //
	// TODO: Determine a better prop name for canReview //
	canReview?: boolean;
	color?: string;
	density?: GlobalDensity;
	direction?: string;
	hideDetails?: boolean;
	title?: string;
	validateOn?: Field['validateOn'];
	variant?: string;
	width?: string;
}

export interface GlobalOptions extends Partial<Props> { }
export interface Settings extends Partial<Omit<Props, 'pages'>> { }


// -------------------------------------------------- Components //
export interface SharedProps {
	field: Field;
	settings?: Settings;
}

export interface Page {
	fields: Field[];
	isReview?: boolean;
	editable?: VStepperItem['editable'];
	title?: string;
	text?: string;
}

// ------------------------- Helpers //
export interface UseConvertToUnit {
	(
		options: {
			unit?: string,
			value: string | number,
		}
	): string | void;
}

// ------------------------- Classes //
export interface UseContainerClasses {
	(
		options: {
			isOption?: boolean;
		}
	): object;
}


// ------------------------- Styles //
export interface UseContainerStyle {
	(
		options: {
			displayType?: string;
		}
	): CSSProperties;
}


declare module "vue" {
	interface ComponentCustomProperties { }

	interface GlobalComponents {
		VStepperForm: typeof VStepperForm;
	}
}
