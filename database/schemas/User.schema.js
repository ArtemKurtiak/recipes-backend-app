const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { user } = dbTablesEnum;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

module.exports = model(user, UserSchema);
