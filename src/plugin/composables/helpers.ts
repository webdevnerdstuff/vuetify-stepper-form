import {
	UseAutoPage,
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
