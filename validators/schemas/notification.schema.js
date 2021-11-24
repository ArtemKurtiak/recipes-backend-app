const Joi = require('joi');

const readNotificationValidator = Joi.object({
    notification_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
});

const correctUserIdValidator = Joi.object({
    user_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
});

module.exports = {
    correctUserIdValidator,
    readNotificationValidator
};
