const Joi = require('joi');

const { regExpEnum: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../../constants');


const registerValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .trim()
        .min(6)
        .regex(PASSWORD_REGEXP)
        .required(),
    username: Joi
        .string()
        .trim()
        .required()
});

const loginValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .required(),
    password: Joi
        .string()
        .trim()
        .required()
});


module.exports = {
    registerValidator,
    loginValidator
};
