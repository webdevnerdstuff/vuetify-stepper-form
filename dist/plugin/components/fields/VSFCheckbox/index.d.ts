import { Field, SharedProps } from '../../../types';
import { VCheckbox } from 'vuetify/components';
import { default as VSFCheckbox } from './VSFCheckbox.vue';
interface InternalField extends Field {
    color?: VCheckbox['color'];
    density?: VCheckbox['density'];
    falseIcon?: VCheckbox['falseIcon'];
    falseValue?: VCheckbox['falseValue'];
    hideDetails?: VCheckbox['hideDetails'];
    hint?: VCheckbox['hint'];
    messages?: VCheckbox['messages'];
    multiple?: VCheckbox['multiple'];
    persistentHint?: VCheckbox['persistentHint'];
    trueValue?: VCheckbox['trueValue'];
}
export interface VSFCheckboxProps extends SharedProps {
    field: InternalField;
}
export default VSFCheckbox;
