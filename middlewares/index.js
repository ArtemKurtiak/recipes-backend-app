module.exports = {
    authMiddlewares: require('./auth.middleware'),
    userMiddlewares: require('./user.middleware'),
    recipesMiddlewares: require('./recipes.middleware'),
    recipesCommentsMiddlewares: require('./recipesComments.middleware'),
    recipeRatingMiddlewares: require('./recipeRating.middleware'),
    validationMiddlewares: require('./validation.middleware')
};
