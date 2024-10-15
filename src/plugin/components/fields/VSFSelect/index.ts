import type { VSelect } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFSelect from './VSFSelect.vue';


// TODO: Check for more props that are not part of the Field type
interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VSelect['density'];
	closeText?: VSelect['closeText'];
	closableChips?: VSelect['closableChips'];
	hideDetails?: VSelect['hideDetails'];
	items?: VSelect['items'];
	variant?: VSelect['variant'];
}

export interface VSFSelectProps extends SharedProps {
	field: InternalField;
	triggerValidation: boolean;
	validateSchema: any;
}

export type VSFSelect = InstanceType<typeof VSFSelect>;

export default VSFSelect;
