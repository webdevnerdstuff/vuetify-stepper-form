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

export interface Field {
	color?: string;
	dateFormat?: string;
	dateSeparator?: string;
	density?: GlobalDensity;
	disabled?: boolean | ((value: any) => boolean);
	error?: boolean;
	hidden?: boolean;
	label?: string;
	name: string;
	options?: KeyStringAny;
	required?: boolean;
	type?: 'checkbox' | 'fancyRadio' | 'file' | 'email' | 'hidden' | 'number' | 'radio' | 'select' | 'switch' | 'textarea' | 'text' | 'textField' | undefined;
	when?: (value: any) => boolean;
	validate?: (field: Field, value: any) => boolean;
	validateOn?: string;

	inline?: boolean; 							// ? Checkboxes
	inlineSpacing?: string;					// ? Checkboxes
	labelPositionLeft?: boolean;		// ? Checkboxes
}

export interface FormSettings {
	color?: string;
	density?: GlobalDensity;
	validateOn?: Field['validateOn'];
}

export interface WelcomeScreen {
	attachment?: object;
	ref?: string;
	title: string;
	properties?: {
		buttonText?: string;
		description?: string;
		showButton?: boolean;
	};
}

// -------------------------------------------------- Props //
export interface Props {
	fields: Field[];
	hidden?: Field[];
	settings?: FormSettings;
	title?: string;
	welcomeScreens?: WelcomeScreen[];
	pages: object[];
}

export interface GlobalOptions extends Partial<Props> { }


// -------------------------------------------------- Components //
export interface SharedProps {
	field: Field;
	settings?: Props['settings'];
}

// -------------------------------------------------- Composables //
export interface UseComposableName {
	(
		options: {
			foo?: string;
		}
	): Props;
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
