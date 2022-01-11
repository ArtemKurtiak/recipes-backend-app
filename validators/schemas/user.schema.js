const Joi = require('joi');

const correctUserIdValidator = Joi.object({
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const optionalUserIdValidator = Joi.object({
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
});

const followersValidator = Joi.object({
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
});

module.exports = {
    correctUserIdValidator,
    followersValidator,
    optionalUserIdValidator
};
