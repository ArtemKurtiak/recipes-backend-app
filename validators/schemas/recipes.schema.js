const Joi = require('joi');

const createRecipeValidator = Joi.object({
    name: Joi
        .string()
        .trim()
        .required(),
    description: Joi
        .string()
        .trim()
        .required(),
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const updateRecipeValidator = Joi.object({
    name: Joi
        .string()
        .trim(),
    description: Joi
        .string()
        .trim(),
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24),
});

const correctIdValidator = Joi.object({
    recipe_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    correctIdValidator,
    createRecipeValidator,
    updateRecipeValidator
};
