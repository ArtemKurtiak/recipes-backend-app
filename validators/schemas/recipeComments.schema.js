const Joi = require('joi');

const createRecipeCommentValidator = Joi.object({
    content: Joi
        .string()
        .trim()
        .required(),
    recipe_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required(),
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const updateRecipeCommentValidator = Joi.object({
    content: Joi
        .string()
        .trim()
        .required(),
});

const correctIdValidator = Joi.object({
    recipe_comment_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    createRecipeCommentValidator,
    updateRecipeCommentValidator,
    correctIdValidator
};
