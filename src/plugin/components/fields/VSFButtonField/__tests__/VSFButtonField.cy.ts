import { VSFButtonFieldProps } from '../';
import * as DATA from '@cypress/templates/testData';
// import type { VSFButtonField } from '../VSFButtonField.vue';
import VStepperForm from '@/plugin/VStepperForm.vue';


const buttonField = DATA.buttonFieldOptions;

const fieldDefault = {
	// activeColor: 'primary-darken-1', // ? Needs click events to test
	// align: 'center', // *
	// appendIcon: '$vuetify', // *
	// baseColor: 'secondary', //
	// block: true, //
	// border: 'xl', //
	// color: 'primary', //
	// density: 'expanded' as const, // *
	// disabled: true, //
	// elevation: 10, //
	// error: true, // ? Not really a button prop
	// errorMessage: ['Error 1', 'Error 2'], // Works via the Field validation
	// exact: true,
	// flat: true,
	// gap: '6', //
	// height: '400px', //
	// hideDetails: true, //
	// hint: 'yo', //
	// href: 'https://google.com', // ** Not allowed
	// icon: '$vuetify', // *
	// id: 'buttonField-id', //
	label: 'Button Field Question',
	// loading: true, //
	maxErrors: 1,
	// maxHeight: '100px', //
	// maxWidth: '100px', //
	// messages: 'Msg', //
	// messages: ['Msg 1', 'Msg 2'], //
	// minHeight: '800px', //
	// minWidth: '300px', //  Set default min width to 100px
	// multiple: true, //
	name: 'buttonField', //
	options: buttonField.options.basic,
	// persistentHint: true, //
	// position: 'fixed',
	// prependIcon: '$vuetify', // *
	// readonly: true, //
	// replace: true,
	required: true,
	// ripple: false, //
	// rounded: true, //
	// selectedClass: 'selected-foo', //
	// size: 'large',
	// slim: false,
	// stacked: true, //
	// symbol: true,
	// tag: 'a', //
	// text: 'foo',
	// theme: 'light', //
	// tile: true, //
	type: 'buttons' as const,
	// value: 'yes',
	// validateOn: 'change',
	// variant: 'outlined', // *
	// width: '500px', //
};

const options: VSFButtonFieldProps['field']['options'] = [
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
	{
		label: 'Sure',
		value: 'sure',
	},
];

const globalOptions = {
	validateOn: 'blur',
};

const answers = {
	fooTest: 'foo',
};


function getBaseStepperElements() {
	/// Stepper Form //
	cy.get('[data-cy="vsf-stepper-form"]').as('stepperForm');
	cy.get('@stepperForm')
		.should('exist')
		.and('be.visible');

	// Application Wrap //
	cy.get('.v-application__wrap').as('appWrap');

	// Submit Button //
	cy.getDataCy('vsf-submit-button')
		.should('exist')
		.and('be.visible');

	// Field Group and Buttons //
	cy.getDataCy('vsf-field-group-buttonField').as('fieldGroup');
	cy.getDataCy('vsf-field-group-buttonField').find('button').as('fieldButtons');
}

async function mountComponent(options: any = {}) {
	const { localAnswers = {}, field = {}, globalProps = {} } = options;

	return await cy.mount(VStepperForm, {
		props: {
			modelValue: { ...answers, ...localAnswers },
			pages: [{ fields: [{ ...fieldDefault, ...field, }], }],
		},
		global: { provide: { globalOptions: { ...globalOptions, ...globalProps }, }, },
		// data() { return this; }
	}).as('wrapper');
}

function baseIconClass(icon: string) {
	return icon.replace(/^mdi:/, '');
}

// 'activeColor' |
// 'appendIcon' |
// 'block' |
// 'border' |
// 'height' |
// 'icon' |
// 'maxWidth' |
// 'minWidth' |
// 'prependIcon' |
// 'selectedClass' |
// 'size' |
// 'stacked' |
// 'variant' |
// 'width'
// align?: string;
// gap?: string | number;
// hint?: string;
// messages?: string | string[];
// multiple?: boolean;
// options?: Option[];
// persistentHint?: boolean;

describe('Buttons Field', () => {

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Field Props ~ //
	describe('Field Props', () => {
		// Align Prop //
		it('should check align prop', () => {
			buttonField.aligns.forEach((align) => {
				mountComponent({
					field: { align }
				});

				getBaseStepperElements();

				cy.get('@fieldGroup').should('have.class', `justify-${align}`);
			});
		});

		// Color Prop //
		it('should check color prop', () => {
			buttonField.colors.forEach((color) => {
				mountComponent({ field: { color } });
				getBaseStepperElements();

				cy.get('@fieldButtons').should('have.class', `text-${color}`);
			});
		});

		// Gap Prop //
		/**
		 * TODO: Update docs to reflect this
		 * ? 16 is the max Vuetify gap class allows:
		 * ? https://vuetifyjs.com/en/styles/spacing/#how-it-works
		*/
		describe('Field Gap', () => {
			it('should check gap prop as number', () => {
				const gap = 16;
				mountComponent({ field: { gap } });
				getBaseStepperElements();

				cy.get('@fieldGroup').should('have.class', `ga-${gap}`);
			});

			it('should check gap prop as string no unit', () => {
				const gap = '16';
				mountComponent({ field: { gap } });
				getBaseStepperElements();

				cy.get('@fieldGroup').should('have.class', `ga-${gap}`);
			});

			it('should check gap prop as string with unit', () => {
				const gap = '20px';
				mountComponent({ field: { gap } });
				getBaseStepperElements();

				cy.get('@fieldGroup').should('have.css', 'gap', gap);
			});
		});

		// // Density Prop //
		// it('should check density prop', () => {
		// 	buttonField.densities.forEach((density) => {
		// 		mountComponent({ field: { density } });
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons').should('have.class', `v-btn--density-${density}`);
		// 	});
		// });

		// // Append & Prepend Icon Prop //
		// it('should check append & prepend icon props', () => {
		// 	const prependIcon = 'mdi:mdi-rabbit';
		// 	const appendIcon = 'mdi:mdi-duck';

		// 	mountComponent({ field: { appendIcon, prependIcon } });
		// 	getBaseStepperElements();

		// 	cy.get('@fieldButtons')
		// 		.each(($button) => {
		// 			cy.wrap($button)
		// 				.find('.v-icon')
		// 				.should('exist')
		// 				.and('have.class', baseIconClass(prependIcon))
		// 				.and('have.class', baseIconClass(appendIcon));
		// 		});

		// });

		// describe('Heights & Widths', () => {
		// 	// Height & Width Props //
		// 	it('should check height and width prop', () => {
		// 		mountComponent({ field: { height: '200px', width: '200px' } });
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons')
		// 			.each(($button) => {
		// 				cy.wrap($button)
		// 					.should('have.css', 'height', '200px')
		// 					.and('have.css', 'width', '200px');
		// 			});
		// 	});

		// 	// Min Height & Min Width Props //
		// 	it('should check max and min width prop', () => {
		// 		mountComponent({
		// 			field: {
		// 				height: '200px',
		// 				minHeight: '300px',
		// 				width: '200px',
		// 				minWidth: '300px',
		// 			}
		// 		});
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons')
		// 			.should(el => expect(el.outerWidth()).eql(300))
		// 			.should(el => expect(el.outerHeight()).eql(300));
		// 	});

		// 	// Max Height & Max Width Props //
		// 	it('should check max and min width prop', () => {
		// 		mountComponent({
		// 			field: {
		// 				height: '200px',
		// 				maxHeight: '100px',
		// 				width: '200px',
		// 				maxWidth: '100px',
		// 			}
		// 		});
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons')
		// 			.should(el => expect(el.outerWidth()).eql(100))
		// 			.should(el => expect(el.outerHeight()).eql(100));
		// 	});
		// });

		// describe('Icons', () => {
		// 	// Icon Prop //
		// 	it('should check icon prop', () => {
		// 		const icon = 'mdi:mdi-rabbit';

		// 		mountComponent({ field: { icon } });
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons')
		// 			.each(($button) => {
		// 				cy.wrap($button)
		// 					.find('.v-icon')
		// 					.should('exist')
		// 					.and('have.class', baseIconClass(icon));
		// 			});
		// 	});
		// });

		// // Variant Prop //
		// it('should check variant prop', () => {
		// 	buttonField.variants.forEach((variant) => {
		// 		mountComponent({ field: { variant } });
		// 		getBaseStepperElements();

		// 		cy.get('@fieldButtons').should('have.class', `v-btn--variant-${variant}`);
		// 	});
		// });
	});

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Field Option (button) Props ~ DONE //
	// describe('Field Option Props', () => {
	// 	// Label Prop //
	// 	it('should check label prop', () => {
	// 		const options = buttonField.options.basic;

	// 		mountComponent({ field: { options } });
	// 		getBaseStepperElements();

	// 		cy.get('@fieldButtons')
	// 			.each(($button, index) => {
	// 				const label = options[index]?.label;

	// 				cy.wrap($button).should('have.text', label);
	// 			});
	// 	});

	// 	// Value Prop //
	// 	it('should check value prop', () => {
	// 		const options = buttonField.options.basic;

	// 		mountComponent({ field: { options } });
	// 		getBaseStepperElements();

	// 		cy.get('@fieldButtons')
	// 			.each(($button, index) => {
	// 				const value = options[index]?.value;

	// 				cy.wrap($button).should('have.value', value);
	// 			});
	// 	});

	// 	// Color Prop //
	// 	it('should check color prop', () => {
	// 		const options = buttonField.options.colors;

	// 		mountComponent({ field: { options } });
	// 		getBaseStepperElements();

	// 		cy.get('@fieldButtons')
	// 			.each(($button, index) => {
	// 				const color = options[index]?.color;

	// 				cy.wrap($button).should('have.class', `text-${color}`);
	// 			});
	// 	});

	// 	// ID & Class Prop //
	// 	it('should check id & class prop', () => {
	// 		const options = buttonField.options.basic;

	// 		mountComponent({ field: { options } });
	// 		getBaseStepperElements();

	// 		cy.get('@fieldButtons')
	// 			.each(($button, index) => {
	// 				const id = options[index]?.id;
	// 				const className = options[index]?.class;

	// 				cy.wrap($button)
	// 					.should('have.id', id)
	// 					.and('have.class', className);
	// 			});
	// 	});

	// 	describe('Heights & Widths', () => {
	// 		// Height & Width Prop //
	// 		it('should check height and width prop', () => {
	// 			const options = buttonField.options.heightAndWidth;

	// 			mountComponent({ field: { options } });
	// 			getBaseStepperElements();

	// 			cy.get('@fieldButtons')
	// 				.each(($button, index) => {
	// 					const height = options[index]?.height;
	// 					const width = options[index]?.width;

	// 					cy.log('height', height);
	// 					cy.log('width', width);

	// 					cy.wrap($button)
	// 						.should(el => expect(el.outerHeight()).eql(Number(height)))
	// 						.and(el => expect(el.outerWidth()).eql(Number(width)));
	// 				});
	// 		});

	// 		// Min Height & Min Width Prop //
	// 		it('should check min height and min width prop', () => {
	// 			const options = buttonField.options.minHeightAndWidth;

	// 			mountComponent({ field: { options } });
	// 			getBaseStepperElements();

	// 			cy.get('@fieldButtons')
	// 				.each(($button, index) => {
	// 					const minHeight = options[index]?.minHeight;
	// 					const minWidth = options[index]?.minWidth;

	// 					cy.wrap($button)
	// 						.should(el => expect(el.outerHeight()).eql(Number(minHeight)))
	// 						.and(el => expect(el.outerWidth()).eql(Number(minWidth)));
	// 				});
	// 		});

	// 		// Max Height & Max Width Prop //
	// 		it('should check max height and max width prop', () => {
	// 			const options = buttonField.options.maxHeightAndWidth;

	// 			mountComponent({ field: { options } });
	// 			getBaseStepperElements();

	// 			cy.get('@fieldButtons')
	// 				.each(($button, index) => {
	// 					const maxHeight = options[index]?.maxHeight;
	// 					const maxWidth = options[index]?.maxWidth;

	// 					cy.wrap($button)
	// 						.should(el => expect(el.outerHeight()).eql(Number(maxHeight)))
	// 						.and(el => expect(el.outerWidth()).eql(Number(maxWidth)));
	// 				});
	// 		});
	// 	});

	// 	describe('Icons', () => {
	// 		// Icon Prop //
	// 		it('should check icon prop', () => {
	// 			const options = buttonField.options.icon;

	// 			mountComponent({ field: { options } });
	// 			getBaseStepperElements();

	// 			cy.get('@fieldButtons')
	// 				.each(($button, index) => {
	// 					const icon = options[index]?.icon;

	// 					cy.wrap($button)
	// 						.find('.v-icon')
	// 						.should('exist')
	// 						.and('have.class', baseIconClass(icon));
	// 				});
	// 		});

	// 		// Append & Prepend Icon Prop //
	// 		it('should check append & prepend icon props', () => {
	// 			const options = buttonField.options.appendPrependIcon;

	// 			mountComponent({ field: { options } });
	// 			getBaseStepperElements();

	// 			cy.get('@fieldButtons')
	// 				.each(($button, index) => {
	// 					const appendIcon = options[index]?.appendIcon;
	// 					const prependIcon = options[index]?.prependIcon;

	// 					cy.wrap($button)
	// 						.find('.v-icon')
	// 						.should('exist')
	// 						.and('have.class', baseIconClass(appendIcon))
	// 						.and('have.class', baseIconClass(prependIcon));
	// 				});
	// 		});
	// 	});
	// });
});
