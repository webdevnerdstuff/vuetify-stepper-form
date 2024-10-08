import type { VColorField } from '@wdns/vuetify-color-field';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFColorField from './VSFColorField.vue';


// TODO: Check for more props that are not part of the Field type
interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: typeof VColorField['density'];
	variant?: typeof VColorField['variant'];
}

export interface VSFColorFieldProps extends SharedProps {
	field: InternalField;
}

export type VSFColorField = InstanceType<typeof VSFColorField>;

export default VSFColorField;
