import type { VFileInput } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFFileInput from './VSFFileInput.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	chips?: VFileInput['chips'];
	density?: VFileInput['density'];
	hideDetails?: VFileInput['hideDetails'];
	multiple?: VFileInput['multiple'];
	variant?: VFileInput['variant'];
}

export interface VFileInputProps extends SharedProps {
	field: InternalField;
	pageIndex: number;
}

export type VSFFileInput = InstanceType<typeof VSFFileInput>;

export default VSFFileInput;
