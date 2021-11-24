const CustomError = require('../errors/CustomError');
const {
    statusCodesEnum: {
        NOT_FOUND
    }
} = require('../constants');
const { Notification } = require('../database');

module.exports = {
    checkNotificationExistsByParam: (paramName, objectToFind = 'body', dbName = paramName) => async (req, res, next) => {
        try {
            const paramValue = req[objectToFind][paramName];

            const notification = await Notification.findOne({ [dbName]: paramValue });

            req.notification = notification;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkNotificationExists: (req, res, next) => {
        try {
            const { notification } = req;

            if (!notification) {
                throw new CustomError('Notification comment not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
