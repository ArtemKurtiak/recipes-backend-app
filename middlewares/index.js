module.exports = {
    authMiddlewares: require('./auth.middleware'),
    userMiddlewares: require('./user.middleware'),
    recipesMiddlewares: require('./recipes.middleware'),
    recipesCommentsMiddlewares: require('./recipesComments.middleware'),
    validationMiddlewares: require('./validation.middleware')
};
