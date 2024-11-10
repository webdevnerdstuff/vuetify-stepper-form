import type VSFButtonField from './VSFButtonField.vue';
import type {
	Field,
	GlobalDensity,
	SharedProps,
} from '@/plugin/types';
import type { VBtn } from 'vuetify/components';


export interface Option {
	appendIcon?: VBtn['appendIcon'];
	class?: string;
	color?: VBtn['color'];
	height?: VBtn['height'];
	icon?: VBtn['icon'];
	id?: Field['id'];
	label: Field['label'];
	maxWidth?: VBtn['maxWidth'];
	minWidth?: VBtn['minWidth'];
	prependIcon?: VBtn['prependIcon'];
	value: string | number;
	width?: VBtn['width'];
}

interface InternalField extends Field, Partial<Pick<VBtn,
	'activeColor' |
	'appendIcon' |
	'block' |
	'border' |
	'height' |
	'icon' |
	'maxWidth' |
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