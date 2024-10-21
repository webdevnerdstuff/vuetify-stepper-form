import type {
	Field,
	GlobalChips,
	GlobalClosableChips,
	GlobalCloseText,
	GlobalMultiple,
	GlobalVariant,
	SharedProps,
} from '@/plugin/types';
import type VuetifyField from './VuetifyField.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	chips?: GlobalChips;
	closableChips?: GlobalClosableChips;
	closeText?: GlobalCloseText;
	multiple?: GlobalMultiple;
	variant?: GlobalVariant;
}

export interface VuetifyFieldProps extends SharedProps {
	field: InternalField;
	component: string;
}

export type VuetifyField = InstanceType<typeof VuetifyField>;

export default VuetifyField;
