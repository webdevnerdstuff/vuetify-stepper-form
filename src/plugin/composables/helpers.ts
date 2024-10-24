import {
	ResponsiveColumns,
	UseAutoPage,
	UseColumnErrorCheck,
	UseMergeProps,
} from '@/plugin/types';
import { watchDebounced } from '@vueuse/core';


/**
* Merges props from three objects.
*/
export const useMergeProps: UseMergeProps = (A, B, C) => {
	const res = {};

	Object.keys({ ...A, ...B, ...C }).map(key => {
		res[key] = C[key] || B[key] || A[key];
	});

	return res;
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

	Object.values(columns as ResponsiveColumns).forEach((column) => {
		if (column < 1 || column > 12) {
			err = true;
		}
	});

	if (!err) {
		return;
	}

	throw new Error(`The ${propName} prop column values must be between 1 and 12`);
};
