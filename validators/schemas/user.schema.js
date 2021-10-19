const Joi = require('joi');

const followUserValidator = Joi.object({
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    followUserValidator
};
