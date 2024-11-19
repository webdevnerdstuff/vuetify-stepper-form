import type {
	UseColumnClasses,
	UseContainerClasses,
	UseStepperContainerClasses,
} from '@/plugin/types';
import { componentName } from '../utils/globals';
import { useColumnErrorCheck } from './helpers';


/**
 * Returns the classes for the container.
 */
export const useContainerClasses: UseContainerClasses = (options) => {
	const { direction } = options;

	return {
		'd-flex flex-column justify-center align-center': direction === 'horizontal',
		[`${componentName}`]: true,
		[`${componentName}--container`]: true,
		[`${componentName}--container-${direction}`]: true,
	};
};


/**
 * Returns the classes for the stepper container.
 */
export const useStepperContainerClasses: UseStepperContainerClasses = (options) => {
	const { direction } = options;

	return {
		'd-flex flex-column justify-center align-center': direction === 'horizontal',
		[`${componentName}--container-stepper`]: true,
		[`${componentName}--container-stepper-${direction}`]: true,
	};
};


/**
 * Returns the classes for columns.
 */
export const useColumnClasses: UseColumnClasses = (options) => {
	const { columnsMerged, fieldColumns, propName } = options;

	if (fieldColumns && propName) {
		useColumnErrorCheck({
			columns: fieldColumns,
			propName: `${propName} prop "columns"`,
		});
	}

	const sm = fieldColumns?.sm ?? columnsMerged.sm;
	const md = fieldColumns?.md ?? columnsMerged.md;
	const lg = fieldColumns?.lg ?? columnsMerged.lg;
	const xl = fieldColumns?.xl ?? columnsMerged.xl;

	return {
		'v-col-12': true,
		'v-cols': true,
		[`v-col-sm-${sm}`]: !!sm,
		[`v-col-md-${md}`]: !!md,
		[`v-col-lg-${lg}`]: !!lg,
		[`v-col-xl-${xl}`]: !!xl,
	};
};
