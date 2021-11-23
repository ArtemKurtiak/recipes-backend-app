const { Notification, User } = require('../database');

module.exports = {
    notifyUser: async (userId, data) => {
        const notification = await Notification.create({ ...data });

        await User.findByIdAndUpdate(userId, {
            $push: {
                notifications: notification._id,
                $position: 0
            }
        });
    }
};
