import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFFancyRadio from './VSFFancyRadio.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	focused?: boolean;
	height?: string;
	width?: string;
	variant?: 'underlined' | 'outlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain';
}

export interface VSFFancyRadioProps extends SharedProps {
	density?: Field['density'] | 'expanded' | 'oversized';
	field: InternalField;
	pageIndex: number;
}

export type VSFFancyRadio = InstanceType<typeof VSFFancyRadio>;

export default VSFFancyRadio;
