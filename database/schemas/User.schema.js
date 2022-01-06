const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const {
    user, followersCount, followsForCount, notification, location
} = dbTablesEnum;

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
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    followers: [{ type: Schema.Types.ObjectId, ref: user }],
    followsFor: [{ type: Schema.Types.ObjectId, ref: user }],
    notifications: [{ type: Schema.Types.ObjectId, ref: notification }],
    active: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: [Number],
    }
}, { timestamps: true, toJSON: { virtuals: true } });

UserSchema.virtual(followersCount).get(function() {
    return this.followers.length;
});

UserSchema.virtual(followsForCount).get(function() {
    return this.followsFor.length;
});

// UserSchema.virtual(location).get(function() {
//     return [
//         this.latitude,
//         this.longitude
//     ];
// });

module.exports = model(user, UserSchema);
