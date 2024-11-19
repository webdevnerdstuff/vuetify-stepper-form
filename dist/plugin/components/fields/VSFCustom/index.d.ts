import { Field, SharedProps } from '../../../types';
import { default as VSFCustom } from './VSFCustom.vue';
interface InternalField extends Omit<Field, 'inline' | 'inlineSpacing' | 'labelPositionLeft'> {
}
export interface VSFCustomProps extends SharedProps {
    field: InternalField;
}
export default VSFCustom;
