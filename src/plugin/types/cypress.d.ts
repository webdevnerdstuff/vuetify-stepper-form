/// <reference types="cypress" />

import { mount } from '@cypress/vue';

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
			getDataCy(value: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}
