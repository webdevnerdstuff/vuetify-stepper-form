import type {
	Field,
	GlobalDensity,
	SharedProps,
} from '@/plugin/types';
import type { VBtn } from 'vuetify/components';
import type VSFButtonField from './VSFButtonField.vue';


interface InternalField extends Field, Partial<Pick<VBtn,
	'activeColor' |
	'appendIcon' |
	'block' |
	'border' |
	'height' |
	'icon' |
	'minWidth' |
	'prependIcon' |
	'selectedClass' |
	'size' |
	'stacked' |
	'variant' |
	'width'
>> {
	align?: string;
	justify?: string;
	gap?: string | number;
	hint?: string;
	messages?: string | string[];
	multiple?: boolean;
	persistentHint?: boolean;
}

export interface VSFButtonFieldProps extends SharedProps {
	density?: GlobalDensity | 'expanded' | 'oversized';
	field: InternalField;
}

export type VSFButtonField = InstanceType<typeof VSFButtonField>;

export default VSFButtonField;
