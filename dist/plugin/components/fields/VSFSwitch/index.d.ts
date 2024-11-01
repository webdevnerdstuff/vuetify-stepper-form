import { default as VSFSwitch } from './VSFSwitch.vue';
import { Field, SharedProps } from '../../../types';
import { VSwitch } from 'vuetify/components';
interface InternalField extends Omit<Field, 'inline' | 'inlineSpacing' | 'labelPositionLeft'> {
    color?: VSwitch['color'];
    density?: VSwitch['density'];
    falseIcon?: VSwitch['falseIcon'];
    hideDetails?: VSwitch['hideDetails'];
}
export interface VSFSwitchProps extends SharedProps {
    field: InternalField;
}
export default VSFSwitch;
