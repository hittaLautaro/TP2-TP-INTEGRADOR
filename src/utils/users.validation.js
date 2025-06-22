import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const optionalSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export default {
  schema,
  optionalSchema,
};
