const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { user, followersCount, followsForCount } = dbTablesEnum;

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
    },
    followers: [{ type: Schema.Types.ObjectId, ref: user }],
    followsFor: [{ type: Schema.Types.ObjectId, ref: user }]
}, { timestamps: true, toJSON: { virtuals: true } });

UserSchema.virtual(followersCount).get(function() {
    return this.followers.length;
});

UserSchema.virtual(followsForCount).get(function() {
    return this.followsFor.length;
});

module.exports = model(user, UserSchema);
