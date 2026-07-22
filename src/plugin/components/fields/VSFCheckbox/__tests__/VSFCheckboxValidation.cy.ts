import * as DATA from '@cypress/templates/testData';
import { object as yupObject, string as yupString } from 'yup';
import VStepperForm from '../../../../VStepperForm.vue';


// Validation-timing coverage for the single checkbox field.
// A menu-less field has no overlay, so it cannot suffer the "errors on open"
// bug the select had. What we verify instead is that toggling the box drives
// validation at the right moment (via onActions('click')) and that the field
// is not flagged before the user interacts with it.
// See VSFCheckbox.vue > onActions and the useField `validateOnValueUpdate`.

const requiredMessage = DATA.isRequired('Checkbox Single');
const mustBeCheckedMessage = 'The box must be checked';

const pages = [
	{
		fields: [DATA.defaultFields.checkbox],
		title: 'Checkbox Page',
	},
];

// A Vuetify single checkbox with `true-value: 'yes'` and no `false-value`
// resolves to `false` when unchecked, so `required()` alone would treat the
// unchecked state as valid (yup casts `false` -> "false"). `oneOf(['yes'])`
// lets us assert that the commit click actually re-runs validation.
const validationSchema = yupObject({
	isThisBoxChecked: yupString()
		.required(requiredMessage)
		.oneOf(['yes'], mustBeCheckedMessage),
});

function mountForm(validateOn: 'blur' | 'change'): void {
	cy.mount(VStepperForm as any, {
		props: {
			modelValue: { isThisBoxChecked: null },
			pages,
			validateOn,
			validationSchema,
		},
	});

	cy.getDataCy('vsf-field-isThisBoxChecked').as('checkbox');
}


for (const validateOn of ['blur', 'change'] as const) {
	describe(`VSFCheckbox validation (validateOn="${validateOn}")`, () => {

		it('is not flagged before the user interacts with it', () => {
			mountForm(validateOn);

			cy.get('@checkbox').should('not.have.class', 'v-input--error');
			cy.get('@checkbox').find('.v-messages__message').should('not.exist');
		});

		it('stays valid after checking the box', () => {
			mountForm(validateOn);

			cy.get('@checkbox').find('input').click();

			cy.get('@checkbox').should('not.have.class', 'v-input--error');
			cy.get('@checkbox').find('.v-messages__message').should('not.exist');
		});

		it('re-validates and errors after the box is checked then unchecked', () => {
			mountForm(validateOn);

			cy.get('@checkbox').find('input').click();
			cy.get('@checkbox').find('input').click();

			cy.get('@checkbox').should('have.class', 'v-input--error');
			cy.get('@checkbox')
				.find('.v-messages__message')
				.should('contain', mustBeCheckedMessage);
		});

	});
}
