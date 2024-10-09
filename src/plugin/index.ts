import type { App } from 'vue';
import type { GlobalOptions } from './types';
import './styles/main.scss';
import VStepperForm from './VStepperForm.vue';
import FieldLabel from './components/shared/FieldLabel.vue';


export const globalOptions = Symbol();

export function createVStepperForm(options: GlobalOptions = {
	settings: {
		color: 'primary',
		density: 'default' as const,
	},
}) {
	const install = (app: App) => {
		app.provide(globalOptions, options);

		app.component('VStepperForm', defineAsyncComponent(() => import('./VStepperForm.vue')));
		app.component('FieldLabel', defineAsyncComponent(() => import('./components/shared/FieldLabel.vue')));
	};

	return {
		install,
	};
}

export default VStepperForm;

export {
	FieldLabel,
	VStepperForm,
};
