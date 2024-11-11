import './commands';
import AppTemplate from '../templates/App.vue';
import vuetify from "../../src/plugins/vuetify";
import { h } from "vue";
import { mount } from 'cypress/vue';


declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
			dataCy(value: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}

Cypress.Commands.add('mount', (component, options = {}) => {
	// Ensure global settings are defined
	options.global = options.global || {};
	options.global.stubs = options.global.stubs || {};
	options.global.stubs['transition'] = false;
	options.global.components = options.global.components || {};
	options.global.plugins = options.global.plugins || [vuetify];

	// Process slots to ensure they are functions
	const slots = options.slots
		? Object.fromEntries(
			Object.entries(options.slots).map(([key, value]) => [
				key,
				// Convert strings or other non-function values into functions
				typeof value === 'function'
					? value
					: () => (typeof value === 'string' ? h('div', value) : h(value)),
			])
		)
		: {};

	// Mount AppTemplate as the root and render `component` inside it
	return mount(AppTemplate, {
		...options,
		slots: {
			// Render the main component in the default slot of AppTemplate
			default: () => h(component, options.props, slots),
		},
	}) as Cypress.Chainable;
});
