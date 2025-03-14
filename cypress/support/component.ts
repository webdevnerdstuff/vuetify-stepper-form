import './commands';
import AppTemplate from '../templates/App.vue';
import vuetify from "../../src/plugins/vuetify";
import { h } from "vue";
import { mount } from 'cypress/vue';
import VStepperForm from '../../src/plugin/VStepperForm.vue';
import * as DATA from '../templates/testData';
import type { Component } from 'vue';
import "cypress-real-events";
import { pluginOptionsInjectionKey } from '../../src/plugin/utils/globals';


// declare global {
// 	namespace Cypress {
// 		interface Chainable {
// 			baseIconClass(icon: string): string;
// 			getBaseStepperElements(excluded: string[]): Chainable;
// 			getDataCy(value: string): Chainable<JQuery<HTMLElement>>;
// 			mount: typeof mount;
// 			mountComponent(options: any): Chainable;
// 		}
// 	}
// }

Cypress.Commands.add('mount', (component: Component, options: any = {}) => {
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
					: () => (typeof value === 'string' ? h('div', value) : h(value as any)),
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


Cypress.Commands.add('getDataCy', (name: string) => {
	return cy.get(`[data-cy="${name}"]`);
});

const answers = {
	buttonField: null,
};

const buttonField = DATA.buttonFieldOptions;

const fieldDefault = {
	label: 'Button Field Question',
	name: 'buttonField',
	options: buttonField.options.basic,
	type: 'buttons' as const,
};

const globalOptions = {
	validateOn: 'blur',
};

interface MountComponentOptions {
	modelValue?: Record<string, any>;
	field?: Partial<typeof fieldDefault>;
	globalProps?: Record<string, any>;
	stepperProps?: Record<string, any>;
}

Cypress.Commands.add('mountComponent', (options: MountComponentOptions = {}) => {
	const { modelValue = {}, field = {}, globalProps = {}, stepperProps = {} } = options;

	const localModelValue = { ...answers, ...modelValue };

	return cy.then(() => {
		cy.mount(VStepperForm as any, {
			props: {
				modelValue: localModelValue,
				pages: [{ fields: [{ ...fieldDefault, ...field, }], }],
				onSubmit: stepperProps.onSubmit ?? undefined,
				validationSchema: stepperProps.validationSchema ?? undefined,
				...stepperProps,
			},
			global: { provide: { [pluginOptionsInjectionKey]: { ...globalOptions, ...globalProps }, }, },
		}).as('wrapper');
	});
});


Cypress.Commands.add('getBaseStepperElements', (excluded = []) => {
	// Stepper Form //
	cy.get('[data-cy="vsf-stepper-form"]').as('stepperForm');
	cy.get('@stepperForm')
		.should('exist')
		.and('be.visible');

	// Stepper Header //
	cy.getDataCy('vsf-stepper-header').as('stepperHeader');
	cy.get('@stepperHeader')
		.should('exist')
		.and('be.visible');

	cy.get('@stepperHeader')
		.find('.v-stepper-item')
		.as('stepperHeaderItems');

	// Application Wrap //
	cy.get('.v-application__wrap').as('appWrap');

	// Submit Button //
	if (!excluded.includes('buttonsField')) {
		cy.getDataCy('vsf-submit-button')
			.should('exist')
			.and('be.visible');

		// Field Group and Buttons //
		cy.getDataCy('vsf-field-group-buttonField').as('fieldGroup');
		cy.getDataCy('vsf-field-group-buttonField').find('button').as('fieldButtons');
	}
});

cy.baseIconClass = (icon: string) => {
	return icon.replace(/^mdi:/, '');
};



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation //
Cypress.Commands.add('navigationMountComponent', (options = {}) => {
	const { editable = true, jumpAhead = true, pages, validationSchema = undefined } = options || {};
	const answers = DATA.navigationTest.answers;

	cy.mount(VStepperForm as any, {
		props: {
			answers,
			editable,
			jumpAhead,
			modelValue: answers,
			pages,
			validationSchema,
		},
		global: DATA.navigationTest.global,
	});
});

Cypress.Commands.add('navigationGetButtons', () => {
	cy.getBaseStepperElements(['buttonsField']);
	cy.getDataCy('vsf-next-button').as('nextButton');
	cy.getDataCy('vsf-previous-button').as('previousButton');
});

Cypress.Commands.add('checkedEnabledDisabledHeaderItems', ({ enabled, disabled, pages }) => {
	pages.forEach((_, index) => {
		if (enabled.includes(index)) {
			cy.get('@stepperHeaderItems')
				.eq(index)
				.should('be.enabled');
		}

		if (disabled.includes(index)) {
			cy.get('@stepperHeaderItems')
				.eq(index)
				.should('be.disabled');
		}
	});
});

cy.cloneArray = (array: any[]): any[] => {
	return JSON.parse(JSON.stringify(array));
};
