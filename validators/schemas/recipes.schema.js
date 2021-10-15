const Joi = require('joi');

const productsValidators = require('./products.schema');
const { recipesCategoriesEnum } = require('../../constants');

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
        .items(createProductValidator),
    recipe_category: Joi
        .string()
        .valid(...Object.values(recipesCategoriesEnum))
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
    products: Joi
        .array()
        .items(createProductValidator),
    recipe_category: Joi
        .string()
        .valid(...Object.values(recipesCategoriesEnum))
        .required()
});

const correctQueryValidator = Joi.object({
    recipe_category: Joi
        .string()
        .trim()
        .valid(...Object.values(recipesCategoriesEnum)),
    user: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
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
    updateRecipeValidator,
    correctQueryValidator
};
