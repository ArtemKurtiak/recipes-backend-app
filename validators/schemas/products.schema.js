const Joi = require('joi');

const createProductValidator = Joi.object({
    name: Joi
        .string()
        .required(),
    description: Joi
        .string()
        .trim(),
    amount: Joi
        .any()
        .required(),
});

module.exports = {
    createProductValidator
};
