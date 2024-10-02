import type { VSwitch } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFSwitch from './VSFSwitch.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	density?: VSwitch['density'];
	falseIcon?: VSwitch['falseIcon'];
}

export interface VSFSwitchProps extends SharedProps {
	field: InternalField;
}

export type VSFSwitch = InstanceType<typeof VSFSwitch>;

export default VSFSwitch;
