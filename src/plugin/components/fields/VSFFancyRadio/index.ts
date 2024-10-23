import type {
	Field,
	GlobalDensity,
	GlobalVariant,
	SharedProps,
} from '@/plugin/types';
import type { VRadio, VRadioGroup } from 'vuetify/components';
import type VSFFancyRadio from './VSFFancyRadio.vue';


export interface RadioGroupProps {
	appendIcon?: VRadioGroup['appendIcon'];
	direction?: VRadioGroup['direction'];
	error?: VRadioGroup['error'];
	hideDetails?: VRadioGroup['hideDetails'];
	hint?: VRadioGroup['hint'];
	inline?: VRadioGroup['inline'];
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
	flat?: boolean;
	focused?: boolean;
	gap?: string;
	height?: string;
	multiple?: VRadio['multiple'];
	variant?: Omit<GlobalVariant, 'solo-inverted'>;
}

export interface VSFFancyRadioProps extends SharedProps {
	density?: GlobalDensity | 'expanded' | 'oversized';
	field: InternalField;
}

export type VSFFancyRadio = InstanceType<typeof VSFFancyRadio>;

export default VSFFancyRadio;
