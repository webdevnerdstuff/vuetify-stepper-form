import { describe, it, expect } from 'vitest';
import {
	useColumnErrorCheck,
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
					.toThrowError(`The ${propName} prop column values must be between 1 and 12`);
			});
		});
	});
});
