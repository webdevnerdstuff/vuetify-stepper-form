import { watchDebounced } from '@vueuse/core';
import {
	UseAutoPage,
	UseBuildSettings,
	UseColumnErrorCheck,
	UseMergeProps,
} from '@/plugin/types';


/**
* Merges props from three objects.
*/
export const useMergeProps: UseMergeProps = (A, B, C) => {
	const res: Record<string, any> = {};

	Object.keys({ ...A, ...B, ...C }).map(key => {
		res[key] = (C[key] ?? B[key] ?? A[key]) as any;
	});

	return res;
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
		theme: stepperProps.theme,
		tile: stepperProps.tile,
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
