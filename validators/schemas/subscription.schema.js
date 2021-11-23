const Joi = require('joi');
const { regExpEnum } = require('../../constants');


const subscribeNewsValidator = Joi.object({
    email: Joi
        .string()
        .regex(regExpEnum.EMAIL_REGEXP)
        .required()
});

module.exports = {
    subscribeNewsValidator
};
