import * as DATA from '@cypress/templates/testData';
import { object as yupObject, string as yupString } from 'yup';
import VStepperForm from '../../../../VStepperForm.vue';


// Validation-timing coverage for the single radio field.
// Radio is menu-less, so it can't hit the select "errors on open" bug. It also
// never returns to an empty state once a value is picked, so we exercise the
// schema's `matches(/(yes|no)/)` rule: picking "Maybe" must flag the field the
// moment it is selected, and picking a valid option must clear it.
// See VSFRadio.vue > onActions and the useField `validateOnValueUpdate`.

const requiredMessage = DATA.isRequired('Radio Single');
const matchesMessage = 'Only "yes" or "no" is allowed';

const pages = [
	{
		fields: [DATA.defaultFields.radio],
		title: 'Radio Page',
	},
];

const validationSchema = yupObject({
	isSingleRadioSelected: yupString()
		.required(requiredMessage)
		.matches(/(yes|no)/, matchesMessage),
});

function mountForm(validateOn: 'blur' | 'change'): void {
	cy.mount(VStepperForm as any, {
		props: {
			modelValue: { isSingleRadioSelected: null },
			pages,
			validateOn,
			validationSchema,
		},
	});

	cy.getDataCy('vsf-field-group-isSingleRadioSelected').as('radioGroup');
}


for (const validateOn of ['blur', 'change'] as const) {
	describe(`VSFRadio validation (validateOn="${validateOn}")`, () => {

		it('is not flagged before an option is selected', () => {
			mountForm(validateOn);

			cy.get('@radioGroup').find('.v-messages__message').should('not.exist');
		});

		it('flags an invalid option the moment it is selected', () => {
			mountForm(validateOn);

			cy.contains('.v-radio', 'Maybe').click();

			cy.get('@radioGroup')
				.find('.v-messages__message')
				.should('contain', matchesMessage);
		});

		it('clears the error after switching to a valid option', () => {
			mountForm(validateOn);

			cy.contains('.v-radio', 'Maybe').click();
			cy.get('@radioGroup')
				.find('.v-messages__message')
				.should('contain', matchesMessage);

			cy.contains('.v-radio', 'Yes').click();

			cy.get('@radioGroup').find('.v-messages__message').should('not.exist');
		});

	});
}
