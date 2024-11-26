import type {
	Field,
	GlobalDensity,
	SharedProps,
} from '@/plugin/types';
import type { VBtn } from 'vuetify/components';
import VSFButtonField from './VSFButtonField.vue';


export interface Option {
	appendIcon?: VBtn['appendIcon'];
	class?: string;
	color?: VBtn['color'];
	height?: VBtn['height'];
	icon?: VBtn['icon'];
	id?: Field['id'];
	label: Field['label'];
	maxHeight?: VBtn['maxHeight'];
	maxWidth?: VBtn['maxWidth'];
	minHeight?: VBtn['minHeight'];
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
	'maxHeight' |
	'maxWidth' |
	'minHeight' |
	'minWidth' |
	'prependIcon' |
	'selectedClass' |
	'size' |
	'stacked' |
	'variant' |
	'width'
>> {
	align?: string;
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
