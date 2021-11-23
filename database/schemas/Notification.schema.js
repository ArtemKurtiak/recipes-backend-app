const { Schema, model } = require('mongoose');

const { dbTablesEnum, notificationTypesEnum } = require('../../constants');

const { notification } = dbTablesEnum;

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(notificationTypesEnum)
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = model(notification, NotificationSchema);
