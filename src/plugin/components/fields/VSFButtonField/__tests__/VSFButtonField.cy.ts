import {
	string as yupString,
	object as yupObject,
} from 'yup';
import * as DATA from '@cypress/templates/testData';


const buttonField = DATA.buttonFieldOptions;


describe('Buttons Field Props', () => {

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Individual Tests //
	// Align Prop //
	it('should check align prop', () => {
		buttonField.aligns.forEach((align) => {
			cy.mountComponent({
				field: { align }
			});

			cy.getBaseStepperElements();

			cy.get('@fieldGroup').should('have.class', `justify-${align}`);
		});
	});

	// Block Prop //
	it('should check block prop', () => {
		cy.mountComponent({ field: { block: true } });
		cy.getBaseStepperElements();

		cy.get('@fieldGroup')
			.should('have.class', 'flex-column');
	});

	// Border Prop //
	it('should check border prop', () => {
		buttonField.borders.forEach((borderSize) => {
			cy.mountComponent({ field: { border: borderSize, color: 'primary' } });

			cy.getBaseStepperElements();

			cy.get('@fieldButtons').first().click();
			cy.get('@fieldButtons')
				.should('have.class', `border-${borderSize}`);
		});
	});

	// Density Prop //
	it('should check density prop', () => {
		buttonField.densities.forEach((density) => {
			cy.mountComponent({ field: { density } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons').should('have.class', `v-btn--density-${density}`);
		});
	});

	// Disabled Prop //
	it('should check disabled prop', () => {
		cy.mountComponent({ field: { disabled: true } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button) => {
				cy.wrap($button).should('be.disabled');
			});
	});

	// Elevation Prop //
	it('should check elevation prop', () => {
		cy.mountComponent({ field: { elevation: 10 } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.should('have.class', 'elevation-10');
	});

	// Error Messages Prop //
	it('should check error prop', () => {
		const errorMessage = 'Field is required';
		const validationSchema = yupObject({
			buttonField: yupString().required(errorMessage),
		});

		cy.mountComponent({
			stepperProps: {
				validationSchema,
			}
		});
		cy.getBaseStepperElements();

		cy.getDataCy('vsf-submit-button')
			.should('exist')
			.and('be.visible')
			.click();

		cy.getDataCy('vsf-field-messages').as('fieldMessages');
		cy.get('@fieldMessages')
			.find('.v-messages__message')
			.contains(errorMessage);
	});

	// Flat Prop //
	it('should check flat prop', () => {
		cy.mountComponent({ field: { flat: true, variant: 'elevated' } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.should('have.class', 'v-btn--flat');
	});

	// Loading Prop //
	it('should check loading prop', () => {
		cy.mountComponent({ field: { loading: true } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button) => {
				cy.wrap($button).should('have.class', 'v-btn--loading');
			});
	});

	// Readonly Prop //
	it('should check readonly prop', () => {
		cy.mountComponent({ field: { readonly: true } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons').should('have.class', 'v-btn--readonly');
	});

	// Size Prop //
	it('should check large prop', () => {
		buttonField.sizes.forEach((size) => {
			cy.mountComponent({ field: { size } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons').should('have.class', `v-btn--size-${size}`);
		});
	});

	// Slim Prop //
	it('should check slim prop', () => {
		cy.mountComponent({
			field: { slim: true }
		});
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.should('have.class', 'v-btn--slim');
	});

	// Stacked Prop //
	it('should check stacked prop', () => {
		cy.mountComponent({ field: { prependIcon: 'mdi:mdi-cog', stacked: true } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.should('have.class', 'v-btn--stacked');
	});

	// Tag Prop //
	it('should check tag prop', () => {
		cy.mountComponent({ field: { tag: 'section' } });

		cy.getDataCy('vsf-field-group-buttonField').find('section').as('fieldAnchors');
		cy.get('@fieldAnchors')
			.each(($button) => {
				cy.wrap($button).should('have.prop', 'tagName', 'SECTION');
			});
	});

	// Variant Prop //
	it('should check variant prop', () => {
		buttonField.variants.forEach((variant) => {
			cy.mountComponent({ field: { variant } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons').should('have.class', `v-btn--variant-${variant}`);
		});
	});

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Grouped Tests //
	// ID and Class Props //
	describe('ID and Class Props', () => {

		// ID Props //
		it('should check id prop', () => {
			cy.mountComponent({ field: { id: 'buttonField-id' } });
			cy.getBaseStepperElements();

			cy.get('@fieldGroup')
				.should('have.id', 'buttonField-id');
		});

		// Selected Class Props //
		it('should check selected class prop', () => {
			cy.mountComponent({
				field: {
					color: 'primary',
					selectedClass: 'selected-foo'
				}
			});
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.first()
				.trigger('click')
				.should('have.class', 'selected-foo');
		});
	});

	// Color Props //
	describe('Color Props', () => {

		// Active Color Prop //
		it('should check active color prop', () => {
			cy.mountComponent({ field: { activeColor: 'secondary' } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.first()
				.trigger('click')
				.should('have.class', 'bg-secondary');
		});

		// Base Color Prop //
		it('should check base color prop', () => {
			cy.mountComponent({ field: { baseColor: '#0f0' } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should('have.css', 'color', 'rgb(0, 255, 0)');
		});

		// Color Prop //
		it('should check color prop', () => {
			buttonField.colors.forEach((color) => {
				cy.mountComponent({ field: { color } });
				cy.getBaseStepperElements();

				cy.get('@fieldButtons').should('have.class', `text-${color}`);
			});
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
			cy.mountComponent({ field: { gap } });
			cy.getBaseStepperElements();

			cy.get('@fieldGroup').should('have.class', `ga-${gap}`);
		});

		it('should check gap prop as string no unit', () => {
			const gap = '16';
			cy.mountComponent({ field: { gap } });
			cy.getBaseStepperElements();

			cy.get('@fieldGroup').should('have.class', `ga-${gap}`);
		});

		it('should check gap prop as string with unit', () => {
			const gap = '20px';
			cy.mountComponent({ field: { gap } });
			cy.getBaseStepperElements();

			cy.get('@fieldGroup').should('have.css', 'gap', gap);
		});
	});

	// Height & Width Props //
	describe('Heights & Widths', () => {
		// Height & Width Props //
		it('should check height and width prop', () => {
			cy.mountComponent({ field: { height: '200px', width: '200px' } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button) => {
					cy.wrap($button)
						.should('have.css', 'height', '200px')
						.and('have.css', 'width', '200px');
				});
		});

		// Min Height & Min Width Props //
		it('should check max and min width prop', () => {
			cy.mountComponent({
				field: {
					height: '200px',
					minHeight: '300px',
					width: '200px',
					minWidth: '300px',
				}
			});
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should(el => expect(el.outerWidth()).eql(300))
				.should(el => expect(el.outerHeight()).eql(300));
		});

		// Max Height & Max Width Props //
		it('should check max and min width prop', () => {
			cy.mountComponent({
				field: {
					height: '200px',
					maxHeight: '100px',
					width: '200px',
					maxWidth: '100px',
				}
			});
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should(el => expect(el.outerWidth()).eql(100))
				.should(el => expect(el.outerHeight()).eql(100));
		});
	});

	// Icon Elements //
	describe('Icons', () => {
		// Icon Prop //
		it('should check icon prop', () => {
			const icon = 'mdi:mdi-rabbit';

			cy.mountComponent({ field: { icon } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button) => {
					cy.wrap($button)
						.find('.v-icon')
						.should('exist')
						.and('have.class', cy.baseIconClass(icon));
				});
		});

		// Append & Prepend Icon Prop //
		it('should check append & prepend icon props', () => {
			const prependIcon = 'mdi:mdi-rabbit';
			const appendIcon = 'mdi:mdi-duck';

			cy.mountComponent({ field: { appendIcon, prependIcon } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button) => {
					cy.wrap($button)
						.find('.v-icon')
						.should('exist')
						.and('have.class', cy.baseIconClass(prependIcon))
						.and('have.class', cy.baseIconClass(appendIcon));
				});
		});
	});

	// Multiple Prop //
	describe('Multiple Prop', () => {
		it('should check multiple true prop', () => {
			const spy = cy.spy().as('submit');

			const finalAnswer = {
				buttonField: ['flower', 'cookie', 'coffee', 'heart'],
			};

			cy.mountComponent({
				field: { color: 'primary', multiple: true },
				stepperProps: {
					onSubmit: spy,
				}
			});
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button) => {
					cy.wrap($button).click();
				});

			cy.getDataCy('vsf-submit-button')
				.should('exist')
				.and('be.visible')
				.click();

			cy.get('@submit').should('have.been.called');
			cy.should(() => expect(spy).to.have.been.called);

			cy.get('@submit').its('args').then((args) => {
				const eventPayload = args[0][0];
				console.log('eventPayload', eventPayload);
				expect(eventPayload).to.deep.equal(finalAnswer);
			});
		});

		it('should check multiple false prop', () => {
			const spy = cy.spy().as('submit');

			cy.mountComponent({
				field: {
					color: 'primary',
					multiple: false,
				},
				stepperProps: {
					onSubmit: spy,
				}
			});
			cy.getBaseStepperElements();
			cy.getDataCy('vsf-button-field-input').as('buttonFieldInput');

			cy.get('@fieldButtons')
				.get('button[value="heart"]')
				.click();

			cy.get('@buttonFieldInput').should('have.value', 'heart');

			cy.getDataCy('vsf-submit-button').click();

			cy.get('@fieldButtons')
				.get('button[value="flower"]')
				.click();

			cy.getDataCy('vsf-submit-button').click();

			cy.get('@submit').its('args').then((args) => {
				const firstCallPayload = args[0][0];
				const secondCallPayload = args[1][0];

				expect(firstCallPayload).to.deep.equal({
					buttonField: 'heart',
				});

				expect(secondCallPayload).to.deep.equal({
					buttonField: 'flower',
				});
			});
		});
	});

	// Radius Type Props //
	describe('Radius Type Props', () => {

		// Rounded Prop //
		it('should check rounded prop', () => {
			buttonField.rounded.forEach((rounded) => {
				cy.mountComponent({ field: { rounded } });
				cy.getBaseStepperElements();

				cy.get('@fieldButtons')
					.should('have.class', `rounded-${rounded}`);
			});
		});

		// Tile Prop //
		it('should check tile prop', () => {
			cy.mountComponent({ field: { tile: true } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should('have.class', 'rounded-0');
		});
	});

	// Ripple Prop //
	describe('Ripple Prop', () => {
		it('should check ripple true prop', () => {
			cy.mountComponent({ field: { ripple: true } });
			cy.getBaseStepperElements();

			// v-ripple__container
			cy.get('@fieldButtons')
				.first()
				.trigger('mousedown')
				.children('.v-ripple__container')
				.should('exist');
		});

		it('should check ripple false prop', () => {
			cy.mountComponent({ field: { ripple: false } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.first()
				.trigger('mousedown')
				.children('.v-ripple__container')
				.should('not.exist');
		});
	});

	// Text Elements //
	describe('Text Elements', () => {

		// Text Prop
		it('should check text prop with html', () => {
			const word = 'Bunnies';

			cy.mountComponent({
				field: { text: `<div style="font-weight: 700;">${word}</div>` }
			});
			cy.getBaseStepperElements();

			cy.getDataCy('vsf-field-text')
				.should('exist')
				.should('have.html', `<div style="font-weight: 700;">${word}</div>`)
				.should('contain.text', word);

			cy.getDataCy('vsf-field-text')
				.find('div')
				.should('have.css', 'font-weight', '700');
		});

		// Hide Details Prop //
		it('should check hide details prop', () => {
			cy.mountComponent({
				field: {
					hideDetails: true,
					hint: 'Bunnies are awesome!',
					messages: 'Bunnies',
					persistentHint: true,
				}
			});

			cy.getDataCy('vsf-field-messages').should('not.exist');
		});

		// Hint & Persistent Hint Prop //
		describe('Hint & Persistent Hint', () => {
			const hint = 'Bunnies are awesome!';

			// Hint //
			it('should check hint prop', () => {
				cy.mountComponent({ field: { hint } });
				cy.getBaseStepperElements();

				cy.getDataCy('vsf-field-messages').as('fieldMessages');
				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('not.exist');

				cy.get('@fieldButtons')
					.first()
					.trigger('mousedown');

				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('exist')
					.and('have.text', hint);

				cy.get('@fieldButtons')
					.first()
					.trigger('mouseup');

				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('not.exist');
			});

			// Persistent Hint //
			it('should check persistent hint prop', () => {
				cy.mountComponent({ field: { hint, persistentHint: true } });
				cy.getBaseStepperElements();

				cy.getDataCy('vsf-field-messages').as('fieldMessages');
				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('exist')
					.and('have.text', hint);

				cy.get('@fieldButtons')
					.first()
					.trigger('mousedown')
					.trigger('mouseup');

				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('exist')
					.and('have.text', hint);
			});

		});

		// Messages Prop //
		describe('Messages Prop', () => {

			// As String //
			it('should check messages prop as a string', () => {
				const messages = 'Bunnies';

				cy.mountComponent({ field: { messages } });

				cy.getDataCy('vsf-field-messages').as('fieldMessages');
				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('exist')
					.and('have.text', messages);
			});

			// As Array //
			it('should check messages prop as an array', () => {
				const messages = ['Bunnies', 'Ducks'];

				cy.mountComponent({ field: { messages } });

				cy.getDataCy('vsf-field-messages').as('fieldMessages');
				cy.get('@fieldMessages')
					.find('.v-messages__message')
					.should('exist')
					.and('have.length', messages.length);

				messages.forEach((message, index) => {
					cy.get('@fieldMessages')
						.find('.v-messages__message')
						.eq(index)
						.should('have.text', message);
				});
			});

		});

		// Required Prop //
		it('should check required prop', () => {
			cy.mountComponent({ field: { required: true } });
			cy.getBaseStepperElements();

			cy.getDataCy('vsf-field-label')
				.should('exist')
				.find('span')
				.should('have.class', 'text-error')
				.should('contain.text', '*');
		});
	});

	// Theme Prop //
	describe('Theme Prop', () => {

		// Dark Theme //
		it('should check theme prop', () => {
			cy.mountComponent({ field: { theme: 'dark' } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should('have.class', 'v-theme--dark');
		});

		// Light Theme //
		it('should check theme prop', () => {
			cy.mountComponent({ field: { theme: 'light' } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.should('have.class', 'v-theme--light');
		});
	});
});
