/* eslint-disable no-param-reassign */
import * as yup from "yup";
import {
	Field,
} from '../types/index';


export const useGetValidationSchema = (fields: Field[]) => {
	// console.log('fields', fields);
	const schema = fields.reduce((schema, field) => {
		const { name, validationType = 'string', validationTypeError, validationRules = [] } = field;

		// console.group('field', field);
		// console.log('name', name);

		// console.log('validationType', validationType);
		// console.log('validationTypeError', validationTypeError);
		// console.log('validationRules', validationRules);
		// console.groupEnd();


		const isObject = name.indexOf('.') >= 0;

		// console.log('yup[validationType]', yup[validationType]);

		if (!yup[validationType]) {
			return schema;
		}
		let validator = yup[validationType]().typeError(validationTypeError || '');

		validationRules.forEach(validation => {
			// console.log('-------- validation', validation);
			const { params, type } = validation;

			if (!validator[type]) {
				return;
			}
			validator = validator[type](...params);
		});

		if (!isObject) {
			// console.log('IS NOT OBJECT');
			return schema.concat(yup.object().shape({ [name]: validator }));
		}

		const reversePath = name.split('.').reverse();
		const currNestedObject = reversePath.slice(1).reduce((yupObj, path) => {
			if (!isNaN(path)) {
				return { array: yup.array().of(yup.object().shape(yupObj)) };
			}
			if (yupObj.array) {
				return { [path]: yupObj.array };
			}
			return { [path]: yup.object().shape(yupObj) };
		}, { [reversePath[0]]: validator });

		const newSchema = yup.object().shape(currNestedObject);
		return schema.concat(newSchema);
	}, yup.object().shape({}));

	return schema;
};
