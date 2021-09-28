module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    regExpEnum: require('./regex.enum'),
    statusCodesEnum: require('./statusCodes.enum'),
    dbTablesEnum: require('./dbTables.enum')
};
