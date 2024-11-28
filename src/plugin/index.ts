import type { PluginOptions } from './types';
import type { App, Plugin } from 'vue';
import './styles/main.scss';
import FieldLabel from './components/shared/FieldLabel.vue';
import { useDeepMerge } from './composables/helpers';
import { pluginOptionsInjectionKey } from './utils/globals';
import { AllProps } from './utils/props';
import VStepperForm from './VStepperForm.vue';


export function createVStepperForm(options: PluginOptions = {}): Plugin {
	const install = (app: App) => {
		const pluginOptions: PluginOptions = useDeepMerge(options, AllProps);

		app.provide(pluginOptionsInjectionKey, pluginOptions);

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
