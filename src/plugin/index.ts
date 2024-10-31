import type { PluginOptions } from './types';
import type { App, Plugin } from 'vue';
import './styles/main.scss';
import FieldLabel from './components/shared/FieldLabel.vue';
import { AllProps } from './utils/props';
import VStepperForm from './VStepperForm.vue';


const defaultOptions = AllProps;
export const globalOptions = Symbol();

export function createVStepperForm(options: PluginOptions = defaultOptions): Plugin {
	const install = (app: App) => {
		app.provide(globalOptions, options);

		// eslint-disable-next-line no-param-reassign
		app.config.idPrefix = 'vsf';

		app.component('VStepperForm', defineAsyncComponent(() => import('./VStepperForm.vue')));
		app.component('FieldLabel', defineAsyncComponent(() => import('./components/shared/FieldLabel.vue')));
	};
	return {
		install,
	} as Plugin;
}

export default VStepperForm;

export {
	FieldLabel,
	VStepperForm,
};
