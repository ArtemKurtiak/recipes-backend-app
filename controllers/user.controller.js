const { statusCodesEnum } = require('../constants');
const { documentUtil } = require('../utils');
const { User } = require('../database');

const { SUCCESS, NO_CONTENT } = statusCodesEnum;
const { normalizeDocument } = documentUtil;

module.exports = {
    getMe: (req, res, next) => {
        try {
            const { user } = req.auth;

            const normalizedUser = normalizeDocument(user);

            res
                .status(SUCCESS)
                .json({ ...normalizedUser });
        } catch (e) {
            next(e);
        }
    },

    followUser: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;
            const { user } = req.body;

            await User.findByIdAndUpdate(user, {
                $push: {
                    followers: {
                        $each: [_id]
                    }
                }
            });

            await User.findByIdAndUpdate(_id, {
                $push: {
                    followsFor: {
                        $each: [user]
                    }
                }
            });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    unfollowUser: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;
            const { user } = req.body;

            await User.findByIdAndUpdate(user, {
                $pull: {
                    followers: _id
                }
            });

            await User.findByIdAndUpdate(_id, {
                $pull: {
                    followsFor: user
                }
            });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },


};
