import * as DATA from '@cypress/templates/testData';
import { object as yupObject, string as yupString } from 'yup';
import VStepperForm from '../../../../VStepperForm.vue';


// Regression coverage for menu-aware blur validation.
// A required select must NOT be flagged as invalid simply because the user
// opened its menu (opening moves focus into the overlay and emits a blur).
// See CommonField.vue > onFocusUpdate / onMenuUpdate.

const requiredMessage = DATA.isRequired('Select Animal');

const pages = [
	{
		fields: [DATA.defaultFields.select],
		title: 'Select Page',
	},
];

const validationSchema = yupObject({
	selectAnimal: yupString().required(requiredMessage),
});

function mountForm(): void {
	cy.mount(VStepperForm as any, {
		props: {
			modelValue: { selectAnimal: null },
			pages,
			validateOn: 'blur',
			validationSchema,
		},
	});

	cy.getDataCy('vsf-field-selectAnimal').as('select');
}

function openMenu(): void {
	cy.get('@select')
		.find('.v-field')
		.invoke('attr', 'aria-controls')
		.as('menuId');

	cy.get('@select').click();
}


describe('CommonField validation (validateOn="blur")', () => {

	it('does not error when a required select menu is merely opened', () => {
		mountForm();
		openMenu();

		// Menu is open and its items are visible.
		cy.get('@menuId').then((menuId) => {
			cy.get(`#${menuId}`).find('.v-list-item').should('exist');
		});

		// Wait past the ~250ms menu-open blur that used to trigger premature
		// validation, then confirm the field is still clean.
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);
		cy.get('@select').should('not.have.class', 'v-input--error');
		cy.get('@select').find('.v-messages__message').should('not.exist');
	});

	it('errors when a required select is closed without a selection', () => {
		mountForm();
		openMenu();

		// Close the menu without choosing anything (click outside).
		cy.get('.v-application__wrap').click();

		cy.get('@select').should('have.class', 'v-input--error');
		cy.get('@select')
			.find('.v-messages__message')
			.should('contain', requiredMessage);
	});

	it('stays valid after selecting a value and closing the menu', () => {
		mountForm();
		openMenu();

		cy.get('@menuId').then((menuId) => {
			cy.get(`#${menuId}`)
				.find('.v-list-item')
				.contains('.v-list-item', 'Rabbit')
				.click();
		});

		cy.get('@select').should('not.have.class', 'v-input--error');
		cy.get('@select').find('.v-messages__message').should('not.exist');
	});

});
