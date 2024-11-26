import * as DATA from '@cypress/templates/testData';


const buttonField = DATA.buttonFieldOptions;


describe('Buttons Field Options Props', () => {

	// Label Prop //
	it('should check label prop', () => {
		const options = buttonField.options.basic;

		cy.mountComponent({ field: { options } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button, index) => {
				const label = options[index]?.label;

				cy.wrap($button).should('have.text', label);
			});
	});

	// Value Prop //
	it('should check value prop', () => {
		const options = buttonField.options.basic;

		cy.mountComponent({ field: { options } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button, index) => {
				const value = options[index]?.value;

				cy.wrap($button).should('have.value', value);
			});
	});

	// Color Prop //
	it('should check color prop', () => {
		const options = buttonField.options.colors;

		cy.mountComponent({ field: { options } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button, index) => {
				const color = options[index]?.color;

				cy.wrap($button).should('have.class', `text-${color}`);
			});
	});

	// ID & Class Prop //
	it('should check id & class prop', () => {
		const options = buttonField.options.basic;

		cy.mountComponent({ field: { options } });
		cy.getBaseStepperElements();

		cy.get('@fieldButtons')
			.each(($button, index) => {
				const id = options[index]?.id;
				const className = options[index]?.class;

				cy.wrap($button)
					.should('have.id', id)
					.and('have.class', className);
			});
	});

	describe('Heights & Widths', () => {

		// Height & Width Prop //
		it('should check height and width prop', () => {
			const options = buttonField.options.heightAndWidth;

			cy.mountComponent({ field: { options } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button, index) => {
					const height = options[index]?.height;
					const width = options[index]?.width;

					cy.log('height', height);
					cy.log('width', width);

					cy.wrap($button)
						.should(el => expect(el.outerHeight()).eql(Number(height)))
						.and(el => expect(el.outerWidth()).eql(Number(width)));
				});
		});

		// Min Height & Min Width Prop //
		it('should check min height and min width prop', () => {
			const options = buttonField.options.minHeightAndWidth;

			cy.mountComponent({ field: { options } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button, index) => {
					const minHeight = options[index]?.minHeight;
					const minWidth = options[index]?.minWidth;

					cy.wrap($button)
						.should(el => expect(el.outerHeight()).eql(Number(minHeight)))
						.and(el => expect(el.outerWidth()).eql(Number(minWidth)));
				});
		});

		// Max Height & Max Width Prop //
		it('should check max height and max width prop', () => {
			const options = buttonField.options.maxHeightAndWidth;

			cy.mountComponent({ field: { options } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button, index) => {
					const maxHeight = options[index]?.maxHeight;
					const maxWidth = options[index]?.maxWidth;

					cy.wrap($button)
						.should(el => expect(el.outerHeight()).eql(Number(maxHeight)))
						.and(el => expect(el.outerWidth()).eql(Number(maxWidth)));
				});
		});
	});

	describe('Icons', () => {

		// Icon Prop //
		it('should check icon prop', () => {
			const options = buttonField.options.icon;

			cy.mountComponent({ field: { options } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button, index) => {
					const icon = options[index]?.icon;

					cy.log(cy.baseIconClass(icon));

					cy.wrap($button)
						.find('.v-icon')
						.should('exist')
						.and('have.class', cy.baseIconClass(icon));
				});
		});

		// Append & Prepend Icon Prop //
		it('should check append & prepend icon props', () => {
			const options = buttonField.options.appendPrependIcon;

			cy.mountComponent({ field: { options } });
			cy.getBaseStepperElements();

			cy.get('@fieldButtons')
				.each(($button, index) => {
					const appendIcon = options[index]?.appendIcon;
					const prependIcon = options[index]?.prependIcon;

					cy.wrap($button)
						.find('.v-icon')
						.should('exist')
						.and('have.class', cy.baseIconClass(appendIcon))
						.and('have.class', cy.baseIconClass(prependIcon));
				});
		});
	});
});
