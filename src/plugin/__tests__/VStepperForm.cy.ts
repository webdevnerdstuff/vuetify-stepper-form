/// <reference types="../cypress" />

import VStepperForm from '../VStepperForm.vue';
import {
	string as yupString,
	object as yupObject,
} from 'yup';


const answers = {
	name: null,
};

const pages = [
	{
		title: 'Page 1',
		fields: [
			{
				label: 'Name',
				name: 'name',
				type: 'text' as const,
				required: true,
				variant: 'outlined',
			}
		]
	},
];

const validationSchema = yupObject({
	name: yupString().required('Name is required'),
});



const global = {
	provide: {
		globalOptions: {
			// color: 'primary',
		},
		// settings: AllProps,
	},
};

describe('Single Page Stepper Form', () => {
	it('should create multiple pages', () => {
		const spy = cy.spy();

		cy.mount(VStepperForm, {
			props: {
				modelValue: answers,
				pages: [
					{
						title: 'Page 1',
						fields: []
					},
					{
						title: 'Page 2',
						fields: []
					},
					{
						title: 'Page 3',
						fields: []
					},
				],
			},
			listeners: {
				'submit': spy
			},
			global,
		});

		const stepperHeader = cy.get('[data-cy="vsf-stepper-header"]');
		stepperHeader
			.should('exist')
			.and('be.visible')
			.should('contain', 'Page 1')
			.and('contain', 'Page 2')
			.and('contain', 'Page 3');

		cy.get('[data-cy="vsf-submit-button"]').should('not.exist');

		const nextButton = cy.get('[data-cy="vsf-next-button"]');
		nextButton
			.should('exist')
			.and('be.visible')
			.click()
			.click();

		cy.get('[data-cy="vsf-submit-button"]')
			.should('exist')
			.and('be.visible')
			.click();
	});
});
