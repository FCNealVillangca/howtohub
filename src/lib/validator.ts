import type Joi from 'joi';

export const validator = (schema: Joi.ObjectSchema<any>, value: any) => {
	const validation = schema.validate(value, { abortEarly: false });
	if (validation.error) {
		const filtered = validation.error.details.map((error: any) => {
			return { [error.path]: error.message };
		});
		return Object.assign({}, ...filtered);
	}
};

export default validator;
