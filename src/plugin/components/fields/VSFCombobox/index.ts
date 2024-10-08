import type { VCombobox } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFCombobox from './VSFCombobox.vue';


// TODO: Check for more props that are not part of the Field type
interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VCombobox['density'];
	closeText?: VCombobox['closeText'];
	closableChips?: VCombobox['closableChips'];
	items?: VCombobox['items'];
	variant?: VCombobox['variant'];
}

export interface VSFComboboxProps extends SharedProps {
	field: InternalField;
}

export type VSFSelect = InstanceType<typeof VSFCombobox>;

export default VSFCombobox;
