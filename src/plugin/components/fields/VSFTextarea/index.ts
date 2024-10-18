import type { VTextarea } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFTextarea from './VSFTextarea.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	color?: VTextarea['color'];
	density?: VTextarea['density'];
	hideDetails?: VTextarea['hideDetails'];
	variant?: VTextarea['variant'];
}

export interface VSFTextareaProps extends SharedProps {
	field: InternalField;
	pageIndex: number;
}

export type VSFTextarea = InstanceType<typeof VSFTextarea>;

export default VSFTextarea;
