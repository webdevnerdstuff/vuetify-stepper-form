import { PluginOptions } from './types';
import { Plugin } from 'vue';
import { default as FieldLabel } from './components/shared/FieldLabel.vue';
import { default as VStepperForm } from './VStepperForm.vue';
export declare const globalOptions: unique symbol;
export declare function createVStepperForm(options?: PluginOptions): Plugin;
export default VStepperForm;
export { FieldLabel, VStepperForm, };
