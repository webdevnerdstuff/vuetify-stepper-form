import type { App, Plugin } from '@vue/runtime-core';
import type { PluginOptions } from './types';
import './styles/main.scss';
import VStepperForm from './VStepperForm.vue';
import FieldLabel from './components/shared/FieldLabel.vue';
import { AllProps } from './utils/props';


export const globalOptions = Symbol();


const defaultOptions = AllProps;

export function createVStepperForm(options: PluginOptions = defaultOptions): Plugin {
	const install = (app: App) => {
		app.provide(globalOptions, options);

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

// export const globalOptions = Symbol();

// export function createVStepperForm(options: PluginOptions = {
// 	color: 'success',
// 	density: 'compact' as const,
// }): Plugin {
// 	const install = (app: App) => {
// 		app.provide(globalOptions, options);

// 		app.component('VStepperForm', defineAsyncComponent(() => import('./VStepperForm.vue')));
// 		app.component('FieldLabel', defineAsyncComponent(() => import('./components/shared/FieldLabel.vue')));
// 	};

// 	return {
// 		install,
// 	};
// }

// export default VStepperForm;

// export {
// 	FieldLabel,
// 	VStepperForm,
// };
