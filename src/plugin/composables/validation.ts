/* eslint-disable no-param-reassign */
import * as yup from "yup";
import {
	UseCheckIfFieldHasErrors,
	UseGetValidationSchema,
	UseOnActions,
	YupObjectShape,
} from '../types/index';


export const useGetValidationSchema: UseGetValidationSchema = (fields) => {
	const schema = fields.reduce((schema, field) => {
		const { name, validationTypeError, rules = [] } = field;
		let { validationType = 'string' } = field;

		if (field.type === 'number') {
			validationType = 'number';
		}

		const isObject = name.indexOf('.') >= 0;

		if (!yup[validationType]) {
			return schema;
		}

		let validator = yup[String(validationType)]().typeError(validationTypeError || '');

		rules.forEach(validation => {
			const { params, type } = validation;

			if (!validator[type]) {
				return;
			}

			validator = validator[type](...params as string[]);
			console.log('validator', validator);
		});

		if (!isObject) {
			return schema.concat(yup.object().shape({ [name]: validator }));
		}

		const reversePath = name.split('.').reverse();
		const currNestedObject = reversePath.slice(1).reduce<YupObjectShape>((yupObj, path) => {
			if (String(path)) {
				return { array: yup.array().of(yup.object().shape(yupObj)) };
			}

			if (yupObj.array) {
				return { [path]: yupObj.array };
			}

			return { [path]: yup.object().shape(yupObj as YupObjectShape) };
		}, { [reversePath[0] as string]: validator });

		const newSchema = yup.object().shape(currNestedObject);
		return schema.concat(newSchema);
	}, yup.object().shape({}));

	return schema;
};


export const useOnActions: UseOnActions = async (options) => {
	const { action, emit, field, localForm, pageIndex, validateOn } = options;
	let responseField = field;
	let results: any = null;

	const isBlur = action === 'blur' && validateOn === 'blur';
	const isInput = action === 'input' && validateOn === 'input';
	const isChange = action === 'change' && validateOn === 'change';

	const shouldValidate = isBlur || isInput || isChange || action === 'page' || action === 'submit';

	if (shouldValidate) {
		results = await localForm?.validate().then((response: any) => {
			if (response.results[field.name]) {
				field.error = response.results[field.name].valid === false;
			}

			if (response.results[field.name]) {
				return response;
			}

			field.error = false;

			return response;
		});

		responseField = useCheckIfFieldHasErrors({
			action,
			emit,
			field,
			pageIndex,
			results,
		});
	}


	return {
		field: responseField,
		results,
		shouldValidate,
	};
};

export const useCheckIfFieldHasErrors: UseCheckIfFieldHasErrors = (options) => {
	console.log('options', options);
	const { action, emit, field, pageIndex, results } = options;

	const data = results;

	field.error = (data?.errors[field.name] && !data?.results[field.name].valid) || false;

	emit('validate', {
		action,
		error: field.error,
		errors: data?.errors,
		fieldName: field.name,
		fieldType: field.type,
		nextPage: action === 'page' || action === 'submit',
		pageIndex: pageIndex - 1,
	});

	return field;
};
