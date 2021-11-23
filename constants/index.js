module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    APP_EMAIL: process.env.APP_EMAIL,
    APP_EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    regExpEnum: require('./regex.enum'),
    statusCodesEnum: require('./statusCodes.enum'),
    dbTablesEnum: require('./dbTables.enum'),
    recipesCategoriesEnum: require('./recipeCategories.enum'),
    emailsEnum: require('./emails.enum'),
    recipeSchemaFieldsEnum: require('./recipeSchemaFields.enum'),
    socketEventsEnum: require('./socketEvents.enum'),
    notificationTypesEnum: require('./notificationTypes.enum')
};
