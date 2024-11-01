import { describe, it, expect } from 'vitest';
import {
	useColumnErrorCheck,
	useDeepMerge,
} from '../helpers';

describe('Helpers Composable', () => {
	describe('useColumnErrorCheck', () => {
		describe('Errors', () => {
			const propName = 'columns';

			it('should return without throwing error if using correct column values', () => {
				expect(() => useColumnErrorCheck({
					columns: {
						lg: 12,
						md: 12,
						sm: 12,
						xl: 12,
					},
					propName: 'columns',
				}))
					.not.toThrow();
			});

			it('should fail if using incorrect column values', () => {
				expect(() => useColumnErrorCheck({
					columns: {
						lg: 120,
						md: 120,
						sm: 120,
						xl: 120,
					},
					propName: propName,
				}))
					.toThrowError(`The ${propName} values must be between 1 and 12`);
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

			expect(mergedProps)
				.toEqual({
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
