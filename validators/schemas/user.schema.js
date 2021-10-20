const Joi = require('joi');

const correctUserIdValidator = Joi.object({
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    correctUserIdValidator
};
