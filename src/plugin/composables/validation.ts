/* eslint-disable no-param-reassign */
import {
	UseOnActions,
} from '../types/index';



export const useOnActions: UseOnActions = async (options) => {
	const { action, emit, field, settingsValidateOn, validate } = options;

	const validateOn = field.validateOn || settingsValidateOn;

	const isBlur = action === 'blur' && validateOn === 'blur';
	const isInput = action === 'input' && validateOn === 'input';
	const isChange = action === 'change' && validateOn === 'change';

	if (isBlur || isInput || isChange || validateOn === 'click') {
		validate()
			.then(() => {
				emit('validate', field);
			});
	}
};
