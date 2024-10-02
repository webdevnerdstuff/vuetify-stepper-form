import type { VTextarea } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFTextarea from './VSFTextarea.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VTextarea['density'];
	variant?: VTextarea['variant'];
}

export interface VSFTextareaProps extends SharedProps {
	field: InternalField;
}

export type VSFTextarea = InstanceType<typeof VSFTextarea>;

export default VSFTextarea;
