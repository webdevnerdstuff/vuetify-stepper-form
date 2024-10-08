import type { VAutocomplete } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFAutocomplete from './VSFAutocomplete.vue';


// TODO: Check for more props that are not part of the Field type
interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VAutocomplete['density'];
	closeText?: VAutocomplete['closeText'];
	closableChips?: VAutocomplete['closableChips'];
	items?: VAutocomplete['items'];
	variant?: VAutocomplete['variant'];
}

export interface VSFAutocompleteProps extends SharedProps {
	field: InternalField;
}

export type VSFSelect = InstanceType<typeof VSFAutocomplete>;

export default VSFAutocomplete;
