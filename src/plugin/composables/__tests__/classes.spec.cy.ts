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

			expect(classes).to.deep.equal({
				'd-flex flex-column justify-center align-center': true,
				'v-stepper-form': true,
				'v-stepper-form--container': true,
				'v-stepper-form--container-horizontal': true
			});
		});

		it('should return class object with direction vertical', () => {
			const classes = useContainerClasses({
				direction: 'vertical',
			});

			expect(classes).to.deep.equal({
				'd-flex flex-column justify-center align-center': false,
				'v-stepper-form': true,
				'v-stepper-form--container': true,
				'v-stepper-form--container-vertical': true
			});
		});
	});

	describe('useStepperContainerClasses', () => {
		it('should return class object with direction horizontal', () => {
			const classes = useStepperContainerClasses({
				direction: 'horizontal',
			});

			console.log('classes', classes);

			expect(classes).to.deep.equal({
				'd-flex flex-column justify-center align-center': true,
				'v-stepper-form--container-stepper': true,
				'v-stepper-form--container-stepper-horizontal': true
			});
		});

		it('should return class object with direction vertical', () => {
			const classes = useStepperContainerClasses({
				direction: 'vertical',
			});

			expect(classes).to.deep.equal({
				'd-flex flex-column justify-center align-center': false,
				'v-stepper-form--container-stepper': true,
				'v-stepper-form--container-stepper-vertical': true
			});
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

			expect(classes).to.deep.equal({
				'v-col-12': true,
				'v-cols': true,
				'v-col-sm-10': true,
				'v-col-md-6': true,
				'v-col-lg-6': true,
				'v-col-xl-9': true
			});
		});
	});
});
