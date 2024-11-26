import * as DATA from '@cypress/templates/testData';


const pagesDefault = DATA.navigationTest.pages;


describe('Stepper Form Navigation No Jumping Ahead', () => {
	it('should be editable, allow all going back', () => {
		const pages = cy.cloneArray(pagesDefault);

		cy.navigationMountComponent({ jumpAhead: false, pages });

		cy.getBaseStepperElements(['buttonsField']);
		cy.getDataCy('vsf-next-button').as('nextButton');
		cy.getDataCy('vsf-previous-button').as('previousButton');

		cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
		cy.get('@nextButton').click();
		cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
		cy.get('@nextButton').click();
		cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
		cy.get('@nextButton').click();
		cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3], disabled: [4], pages });
		cy.get('@nextButton').click();
		cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3, 4], disabled: [], pages });
	});

	describe('Singular Non Editable Pages', () => {
		it('should be editable after page 1', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[0].editable = false;

			cy.navigationMountComponent({ jumpAhead: false, pages });
			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 2], disabled: [0, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 2, 3], disabled: [0, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 2, 3, 4], disabled: [0], pages });
		});

		it('should be editable after page 2', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[1].editable = false;
			cy.navigationMountComponent({ jumpAhead: false, pages });
			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [2, 3], disabled: [0, 1, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [2, 3, 4], disabled: [0, 1], pages });
		});

		it('should be editable after page 3', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[2].editable = false;
			cy.navigationMountComponent({ jumpAhead: false, pages });
			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [3, 4], disabled: [0, 1, 2], pages });
		});

		it('should be editable after page 4', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[3].editable = false;
			cy.navigationMountComponent({ jumpAhead: false, pages });
			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3], disabled: [4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
		});

		it('should be editable until page 5', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[4].editable = false;
			cy.navigationMountComponent({ jumpAhead: false, pages });
			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3], disabled: [4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3, 4], disabled: [], pages });
		});
	});

	describe('Consecutive Non Editable Pages', () => {

		describe('2 Consecutive Non Editable Pages', () => {
			it('should be editable after page 2', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[0].editable = false;
				pages[1].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2, 3], disabled: [0, 1, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2, 3, 4], disabled: [0, 1], pages });
			});

			it('should be editable after page 3', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[1].editable = false;
				pages[2].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3, 4], disabled: [0, 1, 2], pages });
			});

			it('should be editable after page 4', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[2].editable = false;
				pages[3].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
			});

			it('should be editable up to page page 2 but none when at page 4', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[3].editable = false;
				pages[4].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2], disabled: [3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1, 2, 3], disabled: [4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
			});
		});

		describe('3 Consecutive Non Editable Pages', () => {
			it('should be editable after page 3', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[0].editable = false;
				pages[1].editable = false;
				pages[2].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3, 4], disabled: [0, 1, 2], pages });
			});

			it('should be editable after page 3', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[1].editable = false;
				pages[2].editable = false;
				pages[3].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [0, 1], disabled: [2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
			});
		});

		describe('4 Consecutive Non Editable Pages', () => {
			it('should be editable after page 4', () => {
				const pages = cy.cloneArray(pagesDefault);
				pages[0].editable = false;
				pages[1].editable = false;
				pages[2].editable = false;
				pages[3].editable = false;

				cy.navigationMountComponent({ jumpAhead: false, pages });
				cy.navigationGetButtons();

				cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [2], disabled: [0, 1, 3, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
				cy.get('@nextButton').click();
				cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
			});
		});
	});

	describe('Non Consecutive Non Editable Pages', () => {
		it('should be editable, allow all going back', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[0].editable = false;
			pages[2].editable = false;

			cy.navigationMountComponent({ jumpAhead: false, pages });

			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 2], disabled: [0, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [3], disabled: [0, 1, 2, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [3, 4], disabled: [0, 1, 2], pages });
		});

		it('should be editable, allow all going back', () => {
			const pages = cy.cloneArray(pagesDefault);
			pages[0].editable = false;
			pages[3].editable = false;

			cy.navigationMountComponent({ jumpAhead: false, pages });

			cy.navigationGetButtons();

			cy.checkedEnabledDisabledHeaderItems({ enabled: [0], disabled: [1, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1], disabled: [0, 2, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 2], disabled: [0, 3, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [1, 23], disabled: [0, 4], pages });
			cy.get('@nextButton').click();
			cy.checkedEnabledDisabledHeaderItems({ enabled: [4], disabled: [0, 1, 2, 3], pages });
		});
	});
});
