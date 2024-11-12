/// <reference types="../cypress" />

import type { Field } from '../../plugin/types';
import VStepperForm from '../VStepperForm.vue';
import {
	array as yupArray,
	number as yupNumber,
	string as yupString,
	object as yupObject,
} from 'yup';


const finalAnswer = {
	firstName: 'Bunny',
	lastName: 'Rabbit',
	email: 'test@test.com',
	password: 'password1',
	phone: '555-555-5555',
	url: 'https://test.com',
	number: 100,
	isThisBoxChecked: 'yes',
	checkboxMultiple: ["option1", "option3"],
	isSingleRadioSelected: 'yes',
	switchQuestion: 'yes',
};

const answers = {
	firstName: null,
	lastName: null,
	email: null,
	password: null,
	phone: null,
	url: null,
	number: null,
	isThisBoxChecked: null,
	checkboxMultiple: null,
	isSingleRadioSelected: null,
	switchQuestion: null,
	// autocomplete: undefined,
	// autocomplete: 'foo',
	// buttonField: [],
	// color: '#ff0000',
	// combobox: null,
	// combobox: 'Foo',
	// combobox: 'foo',
	// combobox: null,
	// combobox: { title: 'Foo', value: 'foo' },
	// customFoo: null,
	// customBar: null,
	// desc: 'Hello World',
	// file: null,
	// radioMultiple: ['option1', 'option3'],
	// selectField: null,
	// selectField: 'foo',
};

const pages = [
	{
		title: 'Page 1',
		fields: [
			{
				label: 'First Name',
				name: 'firstName',
				type: 'text' as const,
				required: true,
			},
			{
				label: 'Last Name',
				name: 'lastName',
				type: 'text' as const,
				required: true,
			},
			{
				label: 'Email',
				name: 'email',
				type: 'email' as const,
				required: true,
			},
			{
				label: 'Password',
				name: 'password',
				type: 'password' as const,
				required: true,
			},
			{
				label: 'Phone',
				name: 'phone',
				type: 'tel' as const,
				required: true,
			},
			{
				label: 'URL',
				name: 'url',
				type: 'url' as const,
				required: true,
			},
			{
				label: 'Number',
				name: 'number',
				type: 'number' as const,
				required: true,
			},
		]
	},
	{
		title: 'Page 2',
		fields: [
			{
				label: 'Checkbox Single',
				name: 'isThisBoxChecked',
				type: 'checkbox' as const,
				required: true,
			},
			{
				inline: true,
				label: 'Checkbox Multiple',
				multiple: true,
				name: 'checkboxMultiple',
				options: [
					{
						id: 'option1-id',
						label: 'Option 1',
						value: 'option1',
					},
					{
						id: 'option2-id',
						label: 'Option 2',
						value: 'option2',
					},
					{
						id: 'option3-id',
						label: 'Option 3',
						value: 'option3',
					},
				],
				type: 'checkbox' as const,
				required: true,
			},
			{
				inline: true,
				label: 'Radio Single',
				name: 'isSingleRadioSelected',
				options: [
					{
						label: 'Yes',
						value: 'yes',
					},
					{
						label: 'No',
						value: 'no',
					},
					{
						label: 'Maybe',
						value: 'maybe',
					},
				],
				type: 'radio' as const,
				required: true,
			},
			{
				label: 'Switch Question',
				falseValue: 'no',
				name: 'switchQuestion',
				trueValue: 'yes',
				type: 'switch' as const,
			}
		],
	},
	// {
	// 	title: 'Page 3',
	// 	fields: [],
	// },
	{
		isSummary: true,
		text: 'Here\'s the data you\'ve entered. Feel free to review it.',
		title: 'Summary',
	}
];

function isRequired(field: string) {
	return `${field} is required`;
}


const validationSchema = yupObject({
	firstName: yupString().required(isRequired('First Name')),
	lastName: yupString().required(isRequired('Last Name')),
	email: yupString().email('Must be a valid Email').required(isRequired('Email')),
	password: yupString().required(isRequired('Password'))
		.min(5, 'Password must have at least ${min} characters'),
	phone: yupString().required(isRequired('Phone')),
	url: yupString().required(isRequired('URL'))
		.url('Must be a valid URL'),
	number: yupNumber().required(isRequired('Number'))
		.min(finalAnswer.number, 'Number must be at least ${min}'),
	isThisBoxChecked: yupString().required(isRequired('Checkbox Single')),
	checkboxMultiple: yupArray().required(isRequired('Checkbox Multiple'))
		.min(2, 'Must select at least ${min} options'),
	isSingleRadioSelected: yupString().required(isRequired('Radio Single'))
		.matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	switchQuestion: yupString().required(isRequired('Switch Question'))
		.matches(/(yes)/, 'Only "yes" is allowed'),
	// autocomplete: yupString().required(isRequired('Autocomplete')),
	// autocomplete: yupArray().required(isRequired('Autocomplete')),
	// buttonField: yupArray().required(isRequired('Button Field')),
	// buttonField: yupString().required(isRequired('Button Field')).matches(/(yes|no)/, 'Only "yes" or "no" is allowed'),
	// 	.matches(/(^true)/, isRequired('Checkbox Single')),
	// .matches(/(^false)/, 'Checkbox must be not false'),
	// color: yupString().required(isRequired('Color')),
	// combobox: yupArray().required(isRequired('Combobox'))
	// 	.length(1, 'Must select at least ${length} option.'),
	// customFoo: yupString().required(isRequired('Custom Foo')),
	// customBar: yupString().required(isRequired('Custom Bar')),
	// desc: yupString().required(isRequired('Description')),
	// fancyRadio: yupArray().required(isRequired('Fancy Radio')),
	// fancyRadio: yupString().required(isRequired('Fancy Radio')),
	// file: yupString().required(isRequired('File')),
	// selectField: yupString().required(isRequired('Select Field')),
});

const global = {
	provide: {
		globalOptions: {
			color: 'primary',
			validateOn: 'blur',
			fieldColumns: {
				lg: 6,
				md: 12,
				sm: 12,
				xl: 6,
			},
			summaryColumns: {
				lg: 6,
				md: 12,
				sm: 12,
				xl: 6,
			},
			variant: 'outlined',
		},
	},
};

describe('Single Page Stepper Form', () => {
	it('should create multiple pages, navigate to the last page, submit form', () => {
		const spy = cy.spy().as('submit');

		cy.mount(VStepperForm, {
			props: {
				modelValue: answers,
				onSubmit: spy,
				pages,
				validationSchema,
			},
			global,
		});

		// & -------------------------------------------------- Stepper Form //
		cy.get('[data-cy="vsf-stepper-form"]').as('stepperForm');
		cy.get('@stepperForm')
			.should('exist')
			.and('be.visible');


		// & --------------------------------------------------  Stepper Header //
		const stepperHeader = cy.getDataCy('vsf-stepper-header');
		stepperHeader
			.should('exist')
			.and('be.visible')
			// .should('contain', 'Page 1')
			// .and('contain', 'Page 2')
			// .and('contain', 'Page 3')
			.and('contain', 'Summary');


		// & --------------------------------------------------  Submit Button //
		cy.getDataCy('vsf-submit-button').should('not.exist');


		// & --------------------------------------------------  Next & Previous Buttons //
		cy.getDataCy('vsf-next-button').as('nextButton');
		cy.get('@nextButton')
			.should('exist')
			.and('be.visible');

		cy.getDataCy('vsf-previous-button').as('prevButton');
		cy.get('@prevButton')
			.should('exist')
			.and('be.visible')
			.and('be.disabled');


		// & -------------------------------------------------- Fill In Field //
		function fillInField(fieldName: string, ans: string | number): void {
			// cy.log('=========== Filling Field:', fieldName, ans);
			cy.get(fieldName)
				.click()
				.trigger('focus')
				.type('{selectall}{backspace}')
				.type(String(ans))
				.trigger('blur');
		}

		// & -------------------------------------------------- Test Fields //
		function testFields(field: Field, index: number, pageIndex: number): void {
			// cy.log('=========== Testing Field:', field.label);
			// cy.log('fieldIndex', index);
			// cy.log('pageIndex', pageIndex);
			let fieldName = `${field.name}`;

			if (index === 0 && pageIndex === 0) {
				// cy.log('CLICKING NEXT BUTTON');
				cy.get('@nextButton').click();
			}
			if (field.name === 'isSingleRadioSelected') {
				fieldName = `group-${fieldName}`;
			}

			cy.getDataCy(`vsf-field-${fieldName}`).as(fieldName);
			fieldName = `@${fieldName}`;

			cy.get(fieldName)
				.should('exist')
				.and('be.visible');

			const requiredMessage = `${field.label} is required`;

			if (field.name === 'checkboxMultiple' || field.name === 'isSingleRadioSelected') {
				cy.get(fieldName)
					.parent()
					.parent()
					.find('.v-messages__message')
					.contains(requiredMessage);
			}
			else if (field.name !== 'isThisBoxChecked') {
				cy.get(fieldName)
					.find('.v-messages__message')
					.contains(requiredMessage);
			}

			const correctAnswer = finalAnswer[field.name];
			let theAnswer = correctAnswer;

			// & -------------------------------------------------- Email field //
			if (field.type === 'email') {
				fillInField(fieldName, 'test');

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains('Must be a valid Email');

				fillInField(fieldName, correctAnswer);
			}
			// & -------------------------------------------------- URL field //
			else if (field.type === 'url') {
				fillInField(fieldName, 'test');

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains('Must be a valid URL');

				fillInField(fieldName, correctAnswer);
			}
			// & -------------------------------------------------- Number field //
			else if (field.type === 'number') {
				// Fail number validation //
				fillInField(fieldName, 'test');

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains('Number is required');

				// Fail min number validation //
				fillInField(fieldName, 99);

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains(`Number must be at least ${correctAnswer}`);

				fillInField(fieldName, correctAnswer);

				cy.get('@stepperForm')
					.should('not.contain', `Number must be at least ${correctAnswer}`);
			}
			// & -------------------------------------------------- Password field //
			else if (field.type === 'password') {
				// Fail password length //
				fillInField(fieldName, 'test');

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains('Password must have at least 5 characters');

				fillInField(fieldName, correctAnswer);

				cy.get('@stepperForm')
					.should('not.contain', 'Password must have at least 5 characters');
			}
			// & -------------------------------------------------- Checkbox field //
			else if (field.name === 'isThisBoxChecked') {
				cy.get(fieldName)
					.should('exist')
					.should('not.be.checked');

				cy.get(fieldName)
					.find('[type="checkbox"]')
					.check();

				cy.get('@nextButton').click();

				cy.get(fieldName)
					.find('[type="checkbox"]')
					.should('be.checked');
			}
			// & -------------------------------------------------- Checkbox Multiple field //
			else if (field.name === 'checkboxMultiple') {
				// Fail by not selecting enough options //
				cy.get(fieldName)
					.find('[type="checkbox"]')
					.check(['option1']);

				cy.get(fieldName)
					.parent()
					.parent()
					.find('.v-messages__message')
					.contains('Must select at least 2 options');

				cy.get(fieldName)
					.find('[type="checkbox"]')
					.check(['option3']);

				cy.get('@stepperForm')
					.should('not.contain', 'Must select at least 2 options');
			}
			// & -------------------------------------------------- Radio field //
			else if (field.name === 'isSingleRadioSelected') {
				const regexMessage = 'Only "yes" or "no" is allowed';

				cy.get(fieldName)
					.get('[type="radio"]')
					.check(['maybe']);

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains(regexMessage);

				cy.get(fieldName)
					.get('[type="radio"]')
					.check(['yes']);

				cy.get('@stepperForm')
					.should('not.contain', regexMessage);
			}
			// & -------------------------------------------------- Switch field //
			else if (field.name === 'switchQuestion') {
				const regexMessage = 'Only "yes" is allowed';

				cy.get(fieldName)
					.should('exist')
					.should('not.be.checked');

				cy.get(fieldName)
					.find('[type="checkbox"]')
					.check()
					.uncheck();

				cy.get(fieldName)
					.find('.v-messages__message')
					.contains(regexMessage);

				cy.get(fieldName)
					.find('[type="checkbox"]')
					.check();

				cy.get('@stepperForm')
					.should('not.contain', regexMessage);
			}
			// & -------------------------------------------------- All Other Fields //
			else {
				fillInField(fieldName, theAnswer);
			}

			cy.get('@stepperForm')
				.should('not.contain', requiredMessage);
		}

		// Loop through each page and test each fields //
		Object.values(pages).forEach((page, pageIndex) => {
			if (page.fields) {
				Object.values(page?.fields).forEach((field, index) => {
					testFields(field, index, pageIndex);
				});

				cy.get('@nextButton').click();
			}
		});

		cy.getDataCy('vsf-submit-button')
			.should('exist')
			.and('be.visible')
			.click();

		// ? These do the same thing //
		cy.get('@submit').should('have.been.called');
		cy.should(() => expect(spy).to.have.been.called);

		// ? Check the final @submit event payload //
		cy.get('@submit').its('args').then((args) => {
			const eventPayload = args[0][0];
			expect(eventPayload).to.deep.equal(answers);
		});

		Object.entries(finalAnswer).forEach(([key, ans]) => {
			let finalAnswer = ans;

			// TODO: Not sure why this doesn't work //
			if (key === 'checkboxMultiple') {
				// finalAnswer = ["option1", "option3"];
				return;
			}

			cy.get('@stepperForm').should('contain', finalAnswer);
		});
	});
});
