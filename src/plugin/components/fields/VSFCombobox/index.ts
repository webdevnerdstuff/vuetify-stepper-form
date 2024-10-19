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
	closableChips?: VCombobox['closableChips'];
	closeText?: VCombobox['closeText'];
	color?: VCombobox['color'];
	density?: VCombobox['density'];
	hideDetails?: VCombobox['hideDetails'];
	items?: VCombobox['items'];
	variant?: VCombobox['variant'];
}

export interface VSFComboboxProps extends SharedProps {
	field: InternalField;
}

export type VSFSelect = InstanceType<typeof VSFCombobox>;

export default VSFCombobox;
