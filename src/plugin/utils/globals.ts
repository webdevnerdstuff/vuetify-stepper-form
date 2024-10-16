import type {
	ParentPageValidation,
	TriggerValidation,
} from '../types';
import type { EventBusKey } from '@vueuse/core';


export const componentName = 'v-stepper-form';
export const TriggerValidationBus: EventBusKey<TriggerValidation> = Symbol('trigger-validation');
export const ParentPageValidationBus: EventBusKey<ParentPageValidation> = Symbol('parent-page');
