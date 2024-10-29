import type VSFButtonField from './VSFButtonField.vue';
import type {
	Field,
	GlobalDensity,
	SharedProps,
} from '@/plugin/types';
import type { VBtn } from 'vuetify/components';


export interface Option {
	appendIcon?: VBtn['appendIcon'];
	icon?: VBtn['icon'];
	id?: Field['id'];
	label: Field['label'];
	prependIcon?: VBtn['prependIcon'];
	value: string | number;
}

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
	options?: Option[];
	persistentHint?: boolean;
}

export interface VSFButtonFieldProps extends SharedProps {
	density?: GlobalDensity | 'expanded' | 'oversized';
	field: InternalField;
}

// export type VSFButtonField = InstanceType<typeof VSFButtonField>;

export default VSFButtonField;
