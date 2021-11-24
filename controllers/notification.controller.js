const { Notification } = require('../database');
const {
    statusCodesEnum: {
        NO_CONTENT
    }
} = require('../constants');

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
    }
};
