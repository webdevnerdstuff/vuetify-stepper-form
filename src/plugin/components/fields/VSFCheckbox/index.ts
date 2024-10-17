import type { VCheckbox } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFCheckbox from './VSFCheckbox.vue';


interface InternalField extends Field {
	color?: VCheckbox['color'];
	density?: VCheckbox['density'];
	falseIcon?: VCheckbox['falseIcon'];
	falseValue?: VCheckbox['falseValue'];
	hideDetails?: VCheckbox['hideDetails'];
	multiple?: VCheckbox['multiple'];
	trueValue?: VCheckbox['trueValue'];
}

export interface VSFCheckboxProps extends SharedProps {
	field: InternalField;
	pageIndex: number;
	validateSchema: any;
}

export type VSFCheckbox = InstanceType<typeof VSFCheckbox>;

export default VSFCheckbox;
