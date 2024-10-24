import type { VRadio, VRadioGroup } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFRadio from './VSFRadio.vue';


export interface RadioGroupProps {
	appendIcon?: VRadioGroup['appendIcon'];
	direction?: VRadioGroup['direction'];
	error?: VRadioGroup['error'];
	hideDetails?: VRadioGroup['hideDetails'];
	hint?: VRadioGroup['hint'];
	groupId?: VRadioGroup['id'];
	maxErrors?: VRadioGroup['maxErrors'];
	maxWidth?: VRadioGroup['maxWidth'];
	minWidth?: VRadioGroup['minWidth'];
	messages?: VRadioGroup['messages'];
	persistentHint?: VRadioGroup['persistentHint'];
	prependIcon?: VRadioGroup['prependIcon'];
	theme?: VRadioGroup['theme'];
	width?: VRadioGroup['width'];
}

interface InternalField extends Field, RadioGroupProps {
	color?: VRadio['color'];
	density?: VRadio['density'];
	falseIcon?: VRadio['falseIcon'];
	falseValue?: VRadio['falseValue'];
	inline?: VRadio['inline'];
	multiple?: VRadio['multiple'];
	trueValue?: VRadio['trueValue'];
}



export interface VSFRadioProps extends SharedProps {
	field: InternalField;
}

export type VSFRadio = InstanceType<typeof VSFRadio>;

export default VSFRadio;
