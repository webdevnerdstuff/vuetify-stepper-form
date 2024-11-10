import type VSFCustom from './VSFCustom.vue';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
}

export interface VSFCustomProps extends SharedProps {
	field: InternalField;
}

// export type VSFCustom = InstanceType<typeof VSFCustom>;

export default VSFCustom;