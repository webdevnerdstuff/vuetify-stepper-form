import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFBoolean from './VSFBoolean.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: 'compact' | 'comfortable' | 'default';
}

export interface VSFBooleanProps extends SharedProps {
	field: InternalField;
}

export type VSFBoolean = InstanceType<typeof VSFBoolean>;

export default VSFBoolean;
