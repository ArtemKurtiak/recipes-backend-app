module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    regExpEnum: require('./regex.enum'),
    statusCodesEnum: require('./statusCodes.enum'),
    dbTablesEnum: require('./dbTables.enum'),
    recipesCategoriesEnum: require('./recipeCategories.enum')
};
