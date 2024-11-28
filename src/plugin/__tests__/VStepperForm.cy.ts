import type { Field, Page } from '../../plugin/types';
import * as DATA from '@cypress/templates/testData';
import VStepperForm from '../VStepperForm.vue';
import { pluginOptionsInjectionKey } from '../../plugin/utils/globals';


const finalAnswer = DATA.finalAnswer;
const answers = DATA.answers;
const validationSchema = DATA.validationSchema;
const defaultFields = DATA.defaultFields;


const pages = [
	{
		title: 'Common Fields',
		fields: [
			defaultFields.firstName,
			defaultFields.lastName,
			defaultFields.email,
			defaultFields.password,
			defaultFields.phone,
			defaultFields.url,
			defaultFields.number,
			defaultFields.select,
			defaultFields.selectMultiple,
			defaultFields.textarea,

			// TODO: Check to see if the emit passing hidden fields //
			// defaultFields.hidden,
		]
	},
	{
		title: 'Less Common Fields',
		fields: [
			defaultFields.autocomplete,
			defaultFields.autocompleteMultiple,
			defaultFields.combobox,
			{
				...defaultFields.color,
				readonlyInput: true,
			},
			// defaultFields.date,
		],
	},
	{
		title: 'Radio/Checkbox/Switch Fields',
		fields: [
			defaultFields.checkbox,
			{
				...defaultFields.checkboxMultiple,
				inline: true,
			},
			{
				...defaultFields.radio,
				inline: true,
			},
			defaultFields.switch,
		],
	},
	{
		isSummary: true,
		text: "Here's the data you've entered. Feel free to review it.",
		title: 'Summary',
	}
];

const global = {
	provide: {
		[pluginOptionsInjectionKey]: {
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

describe('Stepper Form', () => {

	describe('Single Page Stepper Form', () => {
		it('should create multiple pages, navigate to the last page, submit form', () => {
			const spy = cy.spy().as('submit');

			cy.mount(VStepperForm as any, {
				props: {
					modelValue: answers,
					onSubmit: spy,
					pages,
					validationSchema,
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
				.and('be.visible')
				// .should('contain', 'Common Fields')
				// .and('contain', 'Less Common Fields')
				// .and('contain', 'Radio/Checkbox/Switch Fields')
				.and('contain', 'Summary');


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
			function testFields(field: Field, index: number): void {
				let fieldName = `${field.name}`;
				cy.get('@appWrap').click();

				// ? Trigger next button click to trigger validation //
				if (index === 0) {
					cy.get('@nextButton').click();
				}

				if (field.name === 'isSingleRadioSelected') {
					fieldName = `group-${fieldName}`;
				}

				cy.getDataCy(`vsf-field-${fieldName}`).as(fieldName);
				fieldName = `@${fieldName}`;

				if (field.name !== 'hidden') {
					cy.get(fieldName)
						.should('exist')
						.and('be.visible');
				}

				const requiredMessage = `${field.label} is required`;

				if (field.name === 'checkboxMultiple' || field.name === 'isSingleRadioSelected') {
					cy.get(fieldName)
						.parent()
						.parent()
						.find('.v-messages__message')
						.contains(requiredMessage);
				}
				else if (
					field.name !== 'autocompleteAnimal' &&
					field.name !== 'hidden' &&
					field.name !== 'isThisBoxChecked' &&
					field.name !== 'combobox'
				) {
					cy.get(fieldName)
						.find('.v-messages__message')
						.contains(requiredMessage);
				}

				const correctAnswer = finalAnswer[field.name];
				let theAnswer = correctAnswer;

				// ~ Common Fields Page //
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
				// & -------------------------------------------------- Select Animal //
				else if (field.name === 'selectAnimal') {
					cy.get(fieldName).as('theAnimalSelect');

					cy.get('@theAnimalSelect')
						.find('.v-field')
						.invoke('attr', 'aria-owns')
						.then((fieldId) => {
							cy.get('@theAnimalSelect').click();

							cy.get(`#${fieldId}`)
								.find('.v-list-item')
								.contains('.v-list-item', 'Rabbit')
								.click();

							cy.get('@appWrap').click();
						});
				}
				// & -------------------------------------------------- Select Multiple Animals //
				else if (field.name === 'selectsMultipleAnimals') {
					cy.get(fieldName).as('theSelect');

					cy.get('@theSelect')
						.find('.v-field')
						.invoke('attr', 'aria-owns')
						.then((fieldId) => {
							cy.get('@theSelect').click();

							cy.get(`#${fieldId}`)
								.find('.v-list-item')
								.contains('.v-list-item', 'Rabbit')
								.click();

							// Lose focus so field will update correctly //
							cy.get('@appWrap').click();
							cy.get('@theSelect').click();

							cy.get(`#${fieldId}`)
								.find('.v-list-item')
								.contains('.v-list-item', 'Duck')
								.click();

							cy.get('@appWrap').click();
						});
				}
				// & -------------------------------------------------- Hidden field //
				else if (field.name === 'hidden') {
					cy.get(fieldName).as('hiddenField');

					cy.get('@hiddenField')
						.should('exist')
						.and('not.be.visible');
				}

				// ~ Less Common Fields Page //
				// & -------------------------------------------------- Autocomplete field //
				else if (field.name === 'autocompleteAnimal') {
					cy.get(fieldName).as('theStringAutoSelect');

					cy.get('@theStringAutoSelect')
						.type('Duck')
						.click()
						.trigger('blur')
						.find('.v-field')
						.invoke('attr', 'aria-owns')
						.then((fieldId) => {
							cy.get('@theStringAutoSelect').click();

							cy.get(`#${fieldId}`)
								.find('.v-list-item')
								.contains('.v-list-item', 'Rabbit')
								.click();

							cy.get('@appWrap').click();
						});
				}
				// & -------------------------------------------------- Autocomplete Multiple field //
				else if (field.name === 'autoCompleteMultipleAnimals') {
					cy.get(fieldName).as('theArrayAutoSelect');

					function autoSelectAnimals(animal: string) {
						cy.get('@theArrayAutoSelect')
							.type(animal)
							.find('.v-field')
							.invoke('attr', 'aria-owns')
							.then((fieldId) => {
								cy.get('@theArrayAutoSelect').click();

								cy.get(`#${fieldId}`)
									.find('.v-list-item')
									.first()
									.click();

								// Lose focus so field will update correctly //
								cy.get('@appWrap').click();
							});
					}

					autoSelectAnimals('Rabbit');
					autoSelectAnimals('Duck');
				}
				// & -------------------------------------------------- Combobox field //
				else if (field.name === 'combobox') {
					cy.get(fieldName).as('theCombobox');

					function comboBoxSelectAnimals(animal: string) {
						cy.get('@theCombobox').type(animal);

						cy.get('@theCombobox')
							.find('.v-field')
							.invoke('attr', 'aria-owns')
							.then((fieldId) => {
								cy.get('@theCombobox').click();

								cy.get(`#${fieldId}`)
									.find('.v-list-item')
									.first()
									.click();

								// Lose focus so field will update correctly //
								cy.get('@appWrap').click();
							});
					}

					comboBoxSelectAnimals('Rabbit');

					cy.get(fieldName)
						.parent()
						.parent()
						.find('.v-messages__message')
						.contains('Must select at least 2 options');

					comboBoxSelectAnimals('Duck');
				}
				// & -------------------------------------------------- Color field //
				else if (field.name === 'color') {
					cy.get(fieldName).as('theColor');
					cy.get('@theColor').click();

					cy.get('.v-color-picker-canvas')
						.trigger('mousedown', 150, 75)
						.trigger('mouseup');

					// ? This will change once using Vuetify Color Input //
					cy.get('@appWrap').click();

					cy.get('@theColor')
						.find('input')
						.then((el) => {
							expect(el).to.have.value('#804040');
						});

					cy.get('@appWrap').click();
				}
				// & -------------------------------------------------- Date field //
				else if (field.name === 'date') {
					cy.get(fieldName).as('theDate');

					cy.get('@theDate').click();

					// Select Month //
					cy.get('.v-date-picker-controls__month-btn').click();

					cy.get('.v-date-picker-months__content')
						.find('button')
						.contains('May')
						.click();

					// Select year //
					cy.get('.v-date-picker-controls__mode-btn').click();

					cy.get('.v-date-picker-years__content')
						.find('button')
						.find('.v-btn__content')
						.contains('1977')
						.click();

					// Select Day //
					cy.get('.v-date-picker-month__days')
						.find('button')
						.find('.v-btn__content')
						.contains('25')
						.click();

					// Click OK //
					cy.get('.v-picker__actions').find('button')
						.find('.v-btn__content')
						.contains('OK')
						.click();

					cy.get('@appWrap').click();
				}

				// ~ Radio/Checkbox/Switch Fields Page //
				// & -------------------------------------------------- Checkbox field //
				else if (field.name === 'isThisBoxChecked') {
					cy.get(fieldName)
						.should('exist')
						.should('not.be.checked');

					cy.get(fieldName)
						.find('[type="checkbox"]')
						.check();

					cy.get(fieldName)
						.find('[type="checkbox"]')
						.should('be.checked');
				}
				// & -------------------------------------------------- Checkbox Multiple field //
				else if (field.name === 'checkboxMultiple') {
					// Fail by not selecting enough options //
					cy.get(fieldName)
						.find('[type="checkbox"]')
						.check('option1');

					cy.get(fieldName)
						.parent()
						.parent()
						.find('.v-messages__message')
						.contains('Must select at least 2 options');

					cy.get(fieldName)
						.find('[type="checkbox"]')
						.check('option3');

					cy.get('@stepperForm')
						.should('not.contain', 'Must select at least 2 options');
				}
				// & -------------------------------------------------- Radio field //
				else if (field.name === 'isSingleRadioSelected') {
					const regexMessage = 'Only "yes" or "no" is allowed';

					cy.getDataCy(`vsf-field-${field.name}`).as('radioFields');

					cy.get(fieldName)
						.find('[type="radio"]')
						.should('exist')
						.and('be.not.visible');

					cy.get('@radioFields')
						.find('[aria-label="Maybe"]')
						.should('exist')
						.check(['maybe']);

					cy.get(fieldName)
						.find('.v-messages__message')
						.contains(regexMessage);

					cy.get('@radioFields')
						.find('[aria-label="Yes"]')
						.should('exist')
						.click();
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
			Object.values(pages).forEach((page) => {
				if (page.fields) {
					Object.values(page?.fields).forEach((field, index) => {
						testFields(field, index);
					});

					// ? Need to use realClick to trigger the click event or the next button will be disabled //
					cy.get('@appWrap').click();
					cy.get('@nextButton').realClick();
				}
			});


			// ~ -------------------------------------------------- Check the final answers on Summary Page //
			// TODO //
			// return false;
			// Object.entries(finalAnswer).forEach(([key, ans]) => {
			//   let finalAnswer = ans;

			//   // TODO: Not sure why this doesn't work //
			//   if (key === 'checkboxMultiple') {
			//     // finalAnswer = ["option1", "option3"];
			//     return;
			//   }

			//   cy.get('@stepperForm').should('contain', finalAnswer);
			// });

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
				expect(eventPayload).to.deep.equal(DATA.finalAnswer);
			});
		});
	});

	describe('Auto Page', () => {
		it('should automatically go to the next page', () => {
			cy.mount(VStepperForm as any, {
				props: {
					modelValue: answers,
					pages: [
						{
							fields: [
								defaultFields.firstName,
								{
									...defaultFields.lastName,
									autoPage: true,
								},
							],
							title: 'Page 1',
						},
						{
							fields: [
								defaultFields.address,
								defaultFields.city,
							],
							title: 'Page 2',
						},
						{
							isSummary: true,
							title: 'Summary',
						},
					],
				},
				global,
			});

			cy.getDataCy('vsf-field-address')
				.should('not.exist');
			cy.getDataCy('vsf-field-city')
				.should('not.exist');

			cy.getDataCy(`vsf-field-lastName`)
				.type('Rabbit')
				.trigger('blur');

			// Moved onto the next page - find fields //
			cy.getDataCy('vsf-field-address')
				.should('exist')
				.and('be.visible');

			cy.getDataCy('vsf-field-city')
				.should('exist')
				.and('be.visible');
		});
	});

	describe('Header Tooltip', () => {
		beforeEach(() => {
			cy.mount(VStepperForm as any, {
				props: {
					headerTooltips: true,
					modelValue: answers,
					pages: [
						{
							fields: [
								defaultFields.firstName,
								defaultFields.lastName,
							],
							title: 'Page 1',
						},
						{
							fields: [
								defaultFields.address,
								defaultFields.city,
							],
							title: 'Page 2',
						},
						{
							isSummary: true,
							title: 'Summary',
						},
					],
					tooltipLocation: 'right',
					tooltipTransition: 'fab-transition',
				},
				global,
			});

			// Stepper Form //
			cy.get('[data-cy="vsf-stepper-form"]').as('stepperForm');
			cy.get('@stepperForm')
				.should('exist')
				.and('be.visible');

			cy.getDataCy('vsf-stepper-header')
				.find('.v-stepper-item')
				.as('stepperHeaderItems');

			cy.getDataCy('vsf-next-button').as('nextButton');
		});

		function checkIfTooltipExists(id: string) {
			return cy.get(`#${id}`)
				.should('exist')
				.and('be.visible')
				.and('have.class', 'v-overlay--active');
		}

		it('should check if tooltip exists and contains page field labels', () => {
			cy.getDataCy('vsf-next-button').as('nextButton');
			cy.get('@nextButton').click();

			cy.get('@stepperHeaderItems')
				.first()
				.realHover()
				.find('.v-stepper-item__content')
				.should('exist')
				.then((el) => {
					const tooltipId = el.attr('aria-describedby') || '';

					checkIfTooltipExists(tooltipId)
						.and('contain', 'First Name')
						.and('contain', 'Last Name');
				});

			cy.get('@stepperHeaderItems')
				.eq(1)
				.realHover()
				.find('.v-stepper-item__content')
				.should('exist')
				.then((el) => {
					const tooltipId = el.attr('aria-describedby') || '';

					checkIfTooltipExists(tooltipId)
						.and('contain', 'Address')
						.and('contain', 'City');
				});

			cy.get('@stepperHeaderItems')
				.last()
				.realHover()
				.find('.v-stepper-item__content')
				.should('exist')
				.then((el) => {
					const tooltipId = el.attr('aria-describedby');

					cy.get(`#${tooltipId}`)
						.should('not.exist');
				});
		});

		it('should check tooltip location', () => {
			cy.getDataCy('vsf-next-button').as('nextButton');
			cy.get('@nextButton').click();

			cy.get('@stepperHeaderItems')
				.first()
				.realHover()
				.find('.v-stepper-item__content')
				.should('exist')
				.then((el) => {
					const tooltipId = el.attr('aria-describedby') || '';

					cy.get(`#${tooltipId}`)
						.should('exist')
						.and('be.visible')
						.find('.v-overlay__content')
						.then((el) => {
							const styleAttr = el.attr('style') || '';

							cy.wrap(styleAttr)
								.should('contain', '--v-overlay-anchor-origin: right center');
						});
				});
		});
	});

	describe('Field Columns', () => {
		const stepperFieldColumns = { lg: 6, md: 8, sm: 10, xl: 4 };
		const summaryColumns = { lg: 3, md: 4, sm: 5, xl: 6 };
		const fieldColumnsPagesPageColumns = DATA.fieldColumnsPagesPageColumns;
		const fieldColumnPages: Page[] = DATA.fieldColumnsPages;

		beforeEach(() => {
			cy.mount(VStepperForm as any, {
				props: {
					modelValue: answers,
					pages: fieldColumnPages,
				},
				global: {
					provide: {
						[pluginOptionsInjectionKey]: {
							fieldColumns: stepperFieldColumns,
							summaryColumns,
						},
					},
				},
			});

			cy.getDataCy('vsf-next-button').as('nextButton');
		});

		function shouldHaveColumns(fieldName: string, columns: Page['pageFieldColumns']) {
			cy.getDataCy(`vsf-field-${fieldName}`)
				.parent()
				.should('have.class', 'v-col-12')
				.and('have.class', `v-col-sm-${columns?.sm}`)
				.and('have.class', `v-col-md-${columns?.md}`)
				.and('have.class', `v-col-lg-${columns?.lg}`)
				.and('have.class', `v-col-xl-${columns?.xl}`);
		}

		it('should check the stepper field columns prop', () => {
			shouldHaveColumns('firstName', stepperFieldColumns);
		});

		it('should check the page columns', () => {
			cy.get('@nextButton').click();

			shouldHaveColumns('lastName', fieldColumnsPagesPageColumns);
			shouldHaveColumns('email', fieldColumnsPagesPageColumns);
		});

		it('should check the field columns with custom columns', () => {
			cy.get('@nextButton')
				.click()
				.click();

			const page = fieldColumnPages.find((page) => page.title === 'Page 3');

			if (page && page.fields) {
				page.fields.forEach((field) => {
					shouldHaveColumns(field.name, field.columns);
				});
			}
		});

		it('should check the summary page columns', () => {
			cy.get('@nextButton')
				.click()
				.click()
				.click();

			fieldColumnPages.forEach((page) => {
				if (page.isSummary) {

					page.fields?.forEach((field) => {
						shouldHaveColumns(field.name, summaryColumns);
					});
				}
			});
		});
	});
});
