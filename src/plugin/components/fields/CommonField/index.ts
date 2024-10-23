import type {
	Field,
	GlobalChips,
	GlobalClosableChips,
	GlobalCloseText,
	GlobalMultiple,
	GlobalVariant,
	SharedProps,
} from '@/plugin/types';
import type CommonField from './CommonField.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	chips?: GlobalChips;
	closableChips?: GlobalClosableChips;
	closeText?: GlobalCloseText;
	multiple?: GlobalMultiple;
	variant?: GlobalVariant;
}

export interface CommonFieldProps extends SharedProps {
	field: InternalField;
	component: string;
}

export type CommonField = InstanceType<typeof CommonField>;

export default CommonField;
