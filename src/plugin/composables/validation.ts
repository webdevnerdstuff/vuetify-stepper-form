
import type {
	UseOnActions,
} from '../types/index';


export const useOnActions: UseOnActions = async (options) => {
	const { action, emit, field, settingsValidateOn, validate } = options;

	const validateOn = field.validateOn || settingsValidateOn;

	const isBlur = action === 'blur' && validateOn === 'blur';
	const isChange = action === 'change' && validateOn === 'change';
	const isInput = action === 'input' && validateOn === 'input';

	if (
		isBlur ||
		isInput ||
		isChange ||
		action === 'click'
	) {
		await validate()
			.then(() => {
				emit('validate', field);
			});
	}
};
