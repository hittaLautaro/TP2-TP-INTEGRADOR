import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(1).max(1000).required(),
});

const optionalSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(1).max(1000),
});

export default {
  schema,
  optionalSchema,
};
