import { Component } from 'vue';
import { default as CommonField } from './CommonField.vue';
import { Field, GlobalChips, GlobalClosableChips, GlobalCloseText, GlobalMultiple, GlobalVariant, SharedProps } from '../../../types';
interface InternalField extends Omit<Field, 'inline' | 'inlineSpacing' | 'labelPositionLeft'> {
    chips?: GlobalChips;
    closableChips?: GlobalClosableChips;
    closeText?: GlobalCloseText;
    multiple?: GlobalMultiple;
    variant?: GlobalVariant;
}
export interface CommonFieldProps extends SharedProps {
    field: InternalField;
    component: Component | null;
}
export default CommonField;
