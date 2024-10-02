import type { VTextField } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFTextField from './VSFTextField.vue';


interface InternalField extends Field {
	density?: VTextField['density'];
	variant?: VTextField['variant'];
}

export interface VSFTextFieldProps extends SharedProps {
	field: InternalField;
}

export type VSFTextField = InstanceType<typeof VSFTextField>;

export default VSFTextField;
