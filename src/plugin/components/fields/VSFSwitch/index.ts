import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type { VSwitch } from 'vuetify/components';
import VSFSwitch from './VSFSwitch.vue';


interface InternalField extends Omit<Field,
	'inline' | 'inlineSpacing' | 'labelPositionLeft'
> {
	color?: VSwitch['color'];
	density?: VSwitch['density'];
	falseIcon?: VSwitch['falseIcon'];
	falseValue?: VSwitch['falseValue'];
	hideDetails?: VSwitch['hideDetails'];
	trueValue?: VSwitch['trueValue'];
}

export interface VSFSwitchProps extends SharedProps {
	field: InternalField;
}

// export type VSFSwitch = InstanceType<typeof VSFSwitch>;

export default VSFSwitch;
