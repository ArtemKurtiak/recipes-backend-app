const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { user, auth } = dbTablesEnum;

const AuthSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model(auth, AuthSchema);
