const Joi = require('joi');
const { recipesCategoriesEnum } = require('../constants');

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

module.exports = {
    authValidators: require('./schemas/auth.schema'),
    cartValidators: require('./schemas/cart.schema'),
    productsValidators: require('./schemas/products.schema'),
    recipesValidators: require('./schemas/recipes.schema'),
    recipesCommentsValidators: require('./schemas/recipeComments.schema'),
    recipeRatingValidators: require('./schemas/recipeRating.schema'),
    userValidators: require('./schemas/user.schema'),
    subscriptionValidators: require('./schemas/subscription.schema'),
    notificationValidators: require('./schemas/notification.schema'),
    correctQueryValidator
};
