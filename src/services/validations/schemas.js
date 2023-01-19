const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.object({
  name: Joi.string().min(6).max(30).required()
    .label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least 5 characters long',
});
module.exports = { idSchema, nameSchema };