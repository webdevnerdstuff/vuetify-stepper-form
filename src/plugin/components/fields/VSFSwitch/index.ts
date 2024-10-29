import type VSFSwitch from './VSFSwitch.vue';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type { VSwitch } from 'vuetify/components';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	color?: VSwitch['color'];
	density?: VSwitch['density'];
	falseIcon?: VSwitch['falseIcon'];
	hideDetails?: VSwitch['hideDetails'];
}

export interface VSFSwitchProps extends SharedProps {
	field: InternalField;
}

// export type VSFSwitch = InstanceType<typeof VSFSwitch>;

export default VSFSwitch;
