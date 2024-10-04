import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFBoolean from './VSFBoolean.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: 'compact' | 'comfortable' | 'default' | 'expanded' | 'oversized';
	height?: string;
	width?: string;
	variant?: 'underlined' | 'outlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain';
}

export interface VSFBooleanProps extends SharedProps {
	field: InternalField;
}

export type VSFBoolean = InstanceType<typeof VSFBoolean>;

export default VSFBoolean;
