const { User } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { CONFLICT } } = require('../constants');

module.exports = {
    checkUserExistsByParam: (paramName, objectToFind = 'body', dbName = paramName) => async (req, res, next) => {
        try {
            const paramValue = req[objectToFind][paramName];

            const user = await User.findOne({ [dbName]: paramValue });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserNotExists: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new CustomError('Email already in use', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
