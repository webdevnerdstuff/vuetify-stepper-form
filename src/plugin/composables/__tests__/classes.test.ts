import { describe, it, expect } from 'vitest';
import {
	useColumnClasses,
	useContainerClasses,
	useStepperContainerClasses,
} from '../classes';


describe('Classes Composable', () => {

	describe('useContainerClasses', () => {
		it('should return class object with direction horizontal', () => {
			const classes = useContainerClasses({
				direction: 'horizontal',
			});

			expect(classes).toMatchSnapshot();
		});

		it('should return class object with direction vertical', () => {
			const classes = useContainerClasses({
				direction: 'vertical',
			});

			expect(classes).toMatchSnapshot();
		});
	});

	describe('useStepperContainerClasses', () => {
		it('should return class object with direction horizontal', () => {
			const classes = useStepperContainerClasses({
				direction: 'horizontal',
			});

			expect(classes).toMatchSnapshot();
		});

		it('should return class object with direction vertical', () => {
			const classes = useStepperContainerClasses({
				direction: 'vertical',
			});

			expect(classes).toMatchSnapshot();
		});
	});

	describe('useColumnClasses', () => {
		it('should return column classes with fieldColumns being the higher priority', () => {
			const columnsMerged = {
				lg: 12,
				md: 12,
				sm: 10,
				xl: 9,
			};

			const fieldColumns = {
				lg: 6,
				md: 6,
			};

			const classes = useColumnClasses({
				columnsMerged,
				fieldColumns,
				propName: 'foo field',
			});

			expect(classes).toMatchSnapshot();
		});
	});
});
