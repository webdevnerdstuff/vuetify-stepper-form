import {
	UseContainerClasses,
	UseStepperContainerClasses,
} from '@/plugin/types';
import { componentName } from '../utils/globals';


// ------------------------------------------------ Component Container //
export const useContainerClasses: UseContainerClasses = (options) => {
	const { direction } = options;

	return {
		'd-flex flex-column justify-center align-center': direction === 'horizontal',
		[`${componentName}`]: true,
		[`${componentName}--container`]: true,
		[`${componentName}--container-${direction}`]: true,
	};
};


// ------------------------------------------------ Stepper Container //
export const useStepperContainerClasses: UseStepperContainerClasses = (options) => {
	const { direction } = options;

	return {
		'd-flex flex-column justify-center align-center': direction === 'horizontal',
		[`${componentName}--container-stepper`]: true,
		[`${componentName}--container-stepper-${direction}`]: true,
	};
};
