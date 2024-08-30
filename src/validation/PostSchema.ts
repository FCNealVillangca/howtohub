import Joi from "joi";

export const PostSchema = Joi.object({
	title: Joi.string().max(32).required(),
	content: Joi.string().max(2000).required(),
	categoryId: Joi.string().max(32).required(),
}).unknown(true);
