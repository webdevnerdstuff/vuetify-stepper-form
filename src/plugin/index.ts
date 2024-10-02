import type { App } from 'vue';
import type { GlobalOptions } from './types';
import './styles/main.scss';
import VStepperForm from './VStepperForm.vue';


export const globalOptions = Symbol();

export function createVStepperForm(options: GlobalOptions = {
	settings: {
		color: 'primary',
		density: 'default' as const,
	},
}) {
	const install = (app: App) => {
		app.provide(globalOptions, options);

		app.component('VStepperForm', VStepperForm);
	};

	return {
		install,
	};
}

export default VStepperForm;

export {
	VStepperForm,
};
