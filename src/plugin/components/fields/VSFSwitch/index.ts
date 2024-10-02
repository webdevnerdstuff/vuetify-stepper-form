import type { VSwitch } from 'vuetify/components';
import type {
	Field,
	SharedProps,
} from '@/plugin/types';
import type VSFSwitch from './VSFSwitch.vue';


interface InternalField extends Field {
	density?: VSwitch['density'];
	falseIcon?: VSwitch['falseIcon'];
}

export interface VSFTextareaProps extends SharedProps {
	field: InternalField;
}

export type VSFSwitch = InstanceType<typeof VSFSwitch>;

export default VSFSwitch;
