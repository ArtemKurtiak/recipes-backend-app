const { Notification, User } = require('../database');
const {
    statusCodesEnum: {
        NO_CONTENT, SUCCESS
    },
    dbTablesEnum
} = require('../constants');

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
            const { user_id } = req.params;

            const { notifications: userNotifications } = await User.findById(user_id).populate(notifications);

            res
                .status(SUCCESS)
                .json(userNotifications);
        } catch (e) {
            next(e);
        }
    }
};
