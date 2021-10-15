const Joi = require('joi');

const rateRecipeValidator = Joi.object({
    rating: Joi
        .number()
        .valid(1, 2, 3, 4, 5)
        .required(),
    recipe_id: Joi
        .string()
        .trim()
        .min(24)
        .max(24)
        .required()
});

module.exports = {
    rateRecipeValidator
};
