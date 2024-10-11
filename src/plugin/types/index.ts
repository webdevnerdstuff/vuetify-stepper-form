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


// -------------------------------------------------- Components //
export interface SharedProps {
	field: Field;
	settings: Settings;
}

// TODO: Need to remove the "type" for some fields as they are not valid field types //
export interface Field {
	// Required //
	name: string;

	// Optional //
	autoPage?: Props['autoPage'];
	autoPageDelay?: Props['autoPageDelay'];
	canReview?: Props['canReview'];
	color?: Props['color'];
	// dateFormat?: string;
	// dateSeparator?: string;
	density?: Props['density'];
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


export interface Page {
	autoPage?: boolean;
	editable?: VStepperItem['editable'];
	fields: Field[];
	isReview?: boolean;
	text?: string;
	title?: string;
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
export interface UseContainerClasses {
	(
		options: {
			direction?: Props['direction'];
		}
	): object;
}

export interface UseStepperContainerClasses {
	(
		options: {
			direction?: Props['direction'];
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

declare function createVStepperForm(vuetify?: PluginOptions): {
	install: (app: App) => void;
};

export { createVStepperForm };
