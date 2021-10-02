const Joi = require('joi');

const productsValidators = require('./products.schema');

const { createProductValidator } = productsValidators;

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
        .required(),
    products: Joi
        .array()
        .items(createProductValidator)
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
