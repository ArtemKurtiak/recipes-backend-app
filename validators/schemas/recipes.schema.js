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
    products: Joi
        .array()
        .items(createProductValidator),
    recipe_category: Joi
        .string()
        .valid(...Object.values(recipesCategoriesEnum))
        .required(),
    image: Joi
        .string()
        .trim()
        .required(),
    time: Joi
        .number()
        .required()
});

const updateRecipeValidator = Joi.object({
    name: Joi
        .string()
        .trim(),
    description: Joi
        .string()
        .trim(),
    products: Joi
        .array()
        .items(createProductValidator),
    recipe_category: Joi
        .string()
        .valid(...Object.values(recipesCategoriesEnum)),
    image: Joi
        .string()
        .trim()
        .required(),
    time: Joi
        .number()
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
        .max(24),
    sortBy: Joi
        .string()
        .trim(),
    order: Joi
        .string(),
    page: Joi
        .number(),
    perPage: Joi
        .number(),
    name: Joi
        .string()
        .trim()
});

const correctIdValidator = Joi.object({
    recipe_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

const reactionsForRecipeValidator = Joi.object({
    recipe: Joi
        .string()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    correctIdValidator,
    createRecipeValidator,
    updateRecipeValidator,
    correctQueryValidator,
    reactionsForRecipeValidator
};
