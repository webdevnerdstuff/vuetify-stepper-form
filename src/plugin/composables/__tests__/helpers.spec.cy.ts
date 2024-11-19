import {
	useColumnErrorCheck,
	useDeepMerge,
} from '../helpers';

describe('Helpers Composable', () => {

	describe('useColumnErrorCheck', () => {
		describe('Errors', () => {
			const propName = 'columns';

			it('should not throw an error when using correct column values', () => {
				const invokeCheck = () => {
					useColumnErrorCheck({
						columns: {
							lg: 12,
							md: 12,
							sm: 12,
							xl: 12,
						},
						propName: propName,
					});
				};

				cy.wrap(null).then(() => {
					expect(invokeCheck).not.to.throw();
				});
			});

			it('should fail if using incorrect column values', () => {
				const invokeCheck = () => {
					useColumnErrorCheck({
						columns: {
							lg: 120,
							md: 120,
							sm: 120,
							xl: 120,
						},
						propName: propName,
					});
				};

				expect(() => useColumnErrorCheck({
					columns: {
						lg: 120,
						md: 120,
						sm: 120,
						xl: 120,
					},
					propName: propName,
				}));

				cy.wrap(null).then(() => {
					expect(invokeCheck).to.throw(`The ${propName} values must be between 1 and 12`);
				});
			});
		});
	});

	describe('useDeepMerge', () => {
		it('should deep merge 3 objects', () => {

			const attrs = { class: 'foo-class' };

			const injectedOptions = {
				autoPage: false,
				autoPageDelay: 1000,
				color: 'primary',
				density: 'compact',
				fieldColumns: {
					lg: 12,
					md: 12,
					sm: 6,
				},
				summaryColumns: {
					md: 12,
					sm: 6,
				},
				zed: {
					foo: {
						bar: 'baz',
						qux: 'qux',
					},
				},
			};

			const props = {
				autoPage: true,
				autoPageDelay: 250,
				color: 'secondary',
				density: 'default',
				fieldColumns: {
					md: 6,
					sm: 12,
				},
				summaryColumns: {
					md: 6,
					sm: 12,
				},
				zed: {
					foo: {
						bar: 'biz',
					},
				},
			};

			const mergedProps = useDeepMerge(attrs, injectedOptions, props);

			expect(mergedProps).to.deep.equal({
				autoPage: true,
				autoPageDelay: 250,
				class: 'foo-class',
				color: 'secondary',
				density: 'default',
				fieldColumns: {
					lg: 12,
					md: 6,
					sm: 12,
				},
				summaryColumns: {
					md: 6,
					sm: 12,
				},
				zed: {
					foo: {
						bar: 'biz',
						qux: 'qux',
					},
				},
			});
		});
	});
});
