const Joi = require("joi");

const AddContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().precision(13).required(),
});

const UpdateContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.number().integer().precision(13).optional(),
}).or("name", "email", "phone");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  ValidateCreateContact: (req, _res, next) => {
    return validate(AddContactValidation, req.body, next);
  },
  ValidateChangeContact: (req, _res, next) => {
    return validate(UpdateContactValidation, req.body, next);
  },
};
