const { dbTablesEnum } = require('../constants');
const { statusCodesEnum } = require('../constants');
const { documentUtil } = require('../utils');
const { User } = require('../database');

const { SUCCESS, NO_CONTENT } = statusCodesEnum;
const { normalizeDocument } = documentUtil;
const { followers, followsFor } = dbTablesEnum;

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

    getUserFollowers: async (req, res, next) => {
        try {
            const { user } = req.query;

            if (user) {
                const { followers: userFollowers } = await User.findOne({ _id: user }).populate(followers);

                res
                    .status(SUCCESS)
                    .json(userFollowers);

                return;
            }

            const { _id } = req.auth.user;

            const { followers: userFollowers } = await User.findOne({ _id }).populate(followers);

            res
                .status(SUCCESS)
                .json(userFollowers);
        } catch (e) {
            next(e);
        }
    },

    getUserFollowsFor: async (req, res, next) => {
        try {
            const { user } = req.query;

            if (user) {
                const { followsFor: userFollowsFor } = await User.findOne({ _id: user }).populate(followsFor);

                res
                    .status(SUCCESS)
                    .json(userFollowsFor);

                return;
            }

            const { _id } = req.auth.user;

            const { followsFor: userFollowsFor } = await User.findOne({ _id }).populate(followsFor);

            res
                .status(SUCCESS)
                .json(userFollowsFor);
        } catch (e) {
            next(e);
        }
    }
};
