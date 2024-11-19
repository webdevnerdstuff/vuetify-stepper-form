import { watchDebounced } from '@vueuse/core';
import type {
	UseAutoPage,
	UseBuildSettings,
	UseColumnErrorCheck,
	UseDeepMerge,
} from '@/plugin/types';


/**
* Merges props from three objects.
*/
type AnyObject = Record<string, any>;

export const useDeepMerge: UseDeepMerge = (A, B, C = {}) => {
	const deepMerge = (obj1: AnyObject, obj2: AnyObject): AnyObject => {
		const result: AnyObject = { ...obj1 };
		for (const key in obj2) {
			if (
				obj2[key] !== undefined && // Only proceed if obj2[key] is not undefined
				typeof obj2[key] === 'object' &&
				!Array.isArray(obj2[key])
			) {
				result[key] = deepMerge(result[key] ?? {}, obj2[key]);
			}
			else if (obj2[key] !== undefined) {
				// Only assign if obj2[key] is defined
				result[key] = obj2[key];
			}
		}
		return result;
	};

	// Merge only defined objects with priority order C > B > A
	return [A, B, C].filter(Boolean).reduce(deepMerge, {});
};


/**
* Builds the settings object.
*/
export const useBuildSettings: UseBuildSettings = (stepperProps: Settings) => {
	return {
		altLabels: stepperProps.altLabels,
		autoPage: stepperProps.autoPage,
		autoPageDelay: stepperProps.autoPageDelay,
		bgColor: stepperProps.bgColor,
		border: stepperProps.border,
		color: stepperProps.color,
		density: stepperProps.density,
		disabled: stepperProps.disabled,
		editIcon: stepperProps.editIcon,
		editable: stepperProps.editable,
		elevation: stepperProps.elevation,
		errorIcon: stepperProps.errorIcon,
		fieldColumns: stepperProps.fieldColumns,
		flat: stepperProps.flat,
		headerTooltips: stepperProps.headerTooltips,
		height: stepperProps.height,
		hideActions: stepperProps.hideActions,
		hideDetails: stepperProps.hideDetails,
		keepValuesOnUnmount: stepperProps.keepValuesOnUnmount,
		maxHeight: stepperProps.maxHeight,
		maxWidth: stepperProps.maxWidth,
		minHeight: stepperProps.minHeight,
		minWidth: stepperProps.minWidth,
		nextText: stepperProps.nextText,
		prevText: stepperProps.prevText,
		rounded: stepperProps.rounded,
		selectedClass: stepperProps.selectedClass,
		summaryColumns: stepperProps.summaryColumns,
		tag: stepperProps.tag,
		theme: stepperProps.theme,
		tile: stepperProps.tile,
		tooltipLocation: stepperProps.tooltipLocation,
		tooltipOffset: stepperProps.tooltipOffset,
		tooltipTransition: stepperProps.tooltipTransition,
		transition: stepperProps.transition,
		validateOn: stepperProps.validateOn,
		validateOnMount: stepperProps.validateOnMount,
		variant: stepperProps.variant,
	};
};


/**
* Automatically pages to the next field.
*/
export const useAutoPage: UseAutoPage = (options) => {
	const { emit, field, modelValue, settings } = options;
	watchDebounced(modelValue, () => {
		if (field?.autoPage == false) {
			return;
		}

		if (field?.autoPage || settings?.autoPage) {
			emit('next', field);
		}
	}, { debounce: (field?.autoPageDelay ?? settings?.autoPageDelay) });
};


/**
 * Checks if the column values are between 1 and 12.
 */
export const useColumnErrorCheck: UseColumnErrorCheck = (options) => {
	const { columns, propName } = options;

	let err = false;

	if (!columns) {
		return;
	}

	Object.values(columns).forEach((column) => {
		if (column < 1 || column > 12) {
			err = true;
		}
	});

	if (!err) {
		return;
	}

	throw new Error(`The ${propName} values must be between 1 and 12`);
};
