import type { Field } from '../../../plugin/types';
import * as DATA from '@cypress/templates/testData';
import VStepperForm from '../../VStepperForm.vue';
import { VTextField } from 'vuetify/components';
import {
	string as yupString,
	object as yupObject,
} from 'yup';


interface InternalField extends Field {
	variant: VTextField['$props']['variant'];
}

const fields: InternalField[] = [
	{
		label: 'First Slot',
		name: 'firstSlot',
		required: true,
		type: 'field',
		variant: 'outlined' as const,
	},
	{
		label: 'Second Slot',
		name: 'secondSlot',
		required: true,
		type: 'field',
		variant: 'outlined' as const,
	},
	{
		label: 'Third Slot',
		name: 'thirdSlot',
		required: true,
		type: 'field',
		variant: 'outlined' as const,
	},
];

const pages = [
	{
		title: 'Page 1',
		fields,
	},
	{
		isSummary: true,
		text: "Here's the data you've entered. Feel free to review it.",
		title: 'Summary',
	}
];

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

const answers = ref({
	firstSlot: undefined,
	secondSlot: undefined,
	thirdSlot: undefined,
});

const finalAnswers = {
	firstSlot: 'Bunny',
	secondSlot: 'Duck',
	thirdSlot: 'Llama',
};

const validationSchema = yupObject({
	firstSlot: yupString().required(DATA.isRequired('First Slot')),
	secondSlot: yupString().required(DATA.isRequired('Second Slot')),
	thirdSlot: yupString().required(DATA.isRequired('Third Slot')),

});

describe('Stepper Form Slots', () => {

	it('should use field slot, navigate to the last page, submit form', () => {
		const spy = cy.spy().as('submit');

		cy.mount(VStepperForm as any, {
			props: {
				modelValue: answers.value,
				onSubmit: spy,
				pages,
				validationSchema,
			},
			slots: {
				['field.firstSlot']: slotProps => {
					return h(
						VTextField as any,
						{
							onBlur: slotProps.blur,
							onChange: slotProps.change,
							onInput: slotProps.input,
							'onUpdate:modelValue': (value: any) => {
								answers.value.firstSlot = value;
							},
							...slotProps.field,
						},
						{
							label: () => h(slotProps.FieldLabel, { ...slotProps.field }),
						},
					);
				},
				['field.secondSlot']: slotProps => {
					return h(
						VTextField as any,
						{
							onBlur: slotProps.blur,
							onChange: slotProps.change,
							onInput: slotProps.input,
							'onUpdate:modelValue': (value: any) => {
								answers.value.secondSlot = value;
							},
							...slotProps.field,
						},
						{
							label: () => h(slotProps.FieldLabel, { ...slotProps.field }),
						},
					);
				},
				['field.thirdSlot']: slotProps => {
					return h(
						VTextField as any,
						{
							onBlur: slotProps.blur,
							onChange: slotProps.change,
							onInput: slotProps.input,
							'onUpdate:modelValue': (value: any) => {
								answers.value.thirdSlot = value;
							},
							...slotProps.field,
						},
						{
							label: () => h(slotProps.FieldLabel, { ...slotProps.field }),
						},
					);
				},
			},
			global,
		});

		// ~ -------------------------------------------------- Stepper Form //
		cy.get('[data-cy="vsf-stepper-form"]').as('stepperForm');
		cy.get('@stepperForm')
			.should('exist')
			.and('be.visible');

		cy.get('.v-application__wrap').as('appWrap');


		// ~ --------------------------------------------------  Stepper Header //
		const stepperHeader = cy.getDataCy('vsf-stepper-header');
		stepperHeader
			.should('exist')
			.and('be.visible');


		// ~ --------------------------------------------------  Submit Button //
		cy.getDataCy('vsf-submit-button').should('not.exist');


		// ~ --------------------------------------------------  Next & Previous Buttons //
		cy.getDataCy('vsf-next-button').as('nextButton');
		cy.get('@nextButton')
			.should('exist')
			.and('be.visible');

		cy.getDataCy('vsf-previous-button').as('prevButton');
		cy.get('@prevButton')
			.should('exist')
			.and('be.visible')
			.and('be.disabled');


		// ~ -------------------------------------------------- Fill In Field //
		function fillInField(fieldName: string, ans: string | number): void {
			cy.get(fieldName)
				.click()
				.trigger('focus');

			cy.get(fieldName)
				.type('{selectall}{backspace}')
				.type(String(ans))
				.trigger('blur');
		}

		// ~ -------------------------------------------------- Test Fields //
		function testFields(field: Field): void {
			let fieldName = `${field.name}`;
			cy.get('@appWrap').click();


			cy.getDataCy(`vsf-field-${fieldName}`).as(fieldName);
			fieldName = `@${fieldName}`;

			cy.get(fieldName)
				.should('exist')
				.and('be.visible');

			const requiredMessage = `${field.label} is required`;

			cy.get(fieldName)
				.find('.v-messages__message')
				.contains(requiredMessage);

			const correctAnswer = finalAnswers[field.name];

			fillInField(fieldName, correctAnswer);

			cy.get('@stepperForm')
				.should('not.contain', requiredMessage);
		}

		cy.get('@nextButton').click();

		Object.values(fields).forEach((field) => {
			testFields(field);
		});

		cy.get('@nextButton').click();

		// ~ -------------------------------------------------- Submit Form //
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
			expect(eventPayload).to.deep.equal(finalAnswers);
		});
	});
});
