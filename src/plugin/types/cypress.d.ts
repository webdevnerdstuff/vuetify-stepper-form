/// <reference types="cypress" />

import { mount } from 'cypress/vue';

declare global {
	namespace Cypress {
		interface Chainable {
			baseIconClass(icon: string): string;
			getBaseStepperElements(): Chainable;
			getDataCy(value: string): Chainable<JQuery<HTMLElement>>;
			mount: typeof mount;
			mountComponent(options: any): Chainable;
		}
	}
}
