const { Notification, User } = require('../database');
const {
    statusCodesEnum: {
        NO_CONTENT, SUCCESS
    },
    dbTablesEnum
} = require('../constants');
const { notificationQueryBuilder } = require('../helpers');

const { notifications } = dbTablesEnum;

module.exports = {
    readNotification: async (req, res, next) => {
        try {
            const { notification_id } = req.params;

            await Notification.findByIdAndUpdate(notification_id, { read: true });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    getNotifications: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;

            const [
                skipCount,
                filterObject
            ] = notificationQueryBuilder(req.query);

            const { notifications: userNotifications } = await User
                .findOne({ _id })
                .skip(skipCount)
                .populate({ path: notifications, match: { ...filterObject } });

            res
                .status(SUCCESS)
                .json(userNotifications);
        } catch (e) {
            next(e);
        }
    }
};
