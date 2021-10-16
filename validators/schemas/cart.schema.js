const Joi = require('joi');

const addRecipeToCartValidator = Joi.object({
    recipe_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
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
    addRecipeToCartValidator,
    correctIdValidator
};
