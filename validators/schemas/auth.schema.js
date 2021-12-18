const Joi = require('joi');

const { regExpEnum: { EMAIL_REGEXP, PASSWORD_REGEXP }, regExpEnum } = require('../../constants');


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
        .required(),
    image: Joi
        .any()
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

const forgetPasswordValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .required()
});

const resetPasswordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .trim()
        .required()
});

module.exports = {
    registerValidator,
    loginValidator,
    forgetPasswordValidator,
    resetPasswordValidator
};
