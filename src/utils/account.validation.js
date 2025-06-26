import Joi from "joi";

const deleteAccountSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

export default {
  deleteAccountSchema,
};
