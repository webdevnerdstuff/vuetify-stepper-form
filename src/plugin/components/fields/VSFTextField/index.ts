import type { VTextField } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFTextField from './VSFTextField.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VTextField['density'];
	hideDetails?: VTextField['hideDetails'];
	variant?: VTextField['variant'];
}

export interface VSFTextFieldProps extends SharedProps {
	field: InternalField;
}

export type VSFTextField = InstanceType<typeof VSFTextField>;

export default VSFTextField;
