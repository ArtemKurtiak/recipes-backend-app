const {
    dbTablesEnum, statusCodesEnum, notificationTypesEnum, NEAR_USER_RADIUS_KM, RADIAN_IN_KM
} = require('../constants');
const { documentUtil } = require('../utils');
const { User, Recipe } = require('../database');
const { notificationService } = require('../services');
const { likesQueryBuilder } = require('../helpers');

const { SUCCESS, NO_CONTENT } = statusCodesEnum;
const { followers, followsFor } = dbTablesEnum;
const { NEW_FOLLOWER } = notificationTypesEnum;
const { normalizeDocument } = documentUtil;
const { notifyUser } = notificationService;

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

            const { username } = await User.findByIdAndUpdate(_id, {
                $push: {
                    followsFor: {
                        $each: [user]
                    }
                }
            }, { new: true });

            await notifyUser(user, {
                title: `You have new follower - ${username}`,
                type: NEW_FOLLOWER
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
    },

    checkIn: async (req, res, next) => {
        try {
            const { _id: userId } = req.auth.user;

            await User.findByIdAndUpdate(userId, { active: true });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    checkOut: async (req, res, next) => {
        try {
            const { _id: userId } = req.auth.user;

            await User.findByIdAndUpdate(userId, { active: false });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    getUserLikes: async (req, res, next) => {
        try {
            const { _id: userId } = req.auth.user;

            const [
                filterObject,
                skipCount,
                limit
            ] = likesQueryBuilder(req.query);

            const recipes = await Recipe
                .find({
                    likes: userId,
                    ...filterObject
                })
                .skip(skipCount)
                .limit(limit);

            res
                .status(SUCCESS)
                .json(recipes);
        } catch (e) {
            next(e);
        }
    },

    getNearUsers: async (req, res, next) => {
        try {
            const { latitude, longitude } = req.auth.user;

            const users = await User.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [
                                latitude,
                                longitude,
                            ],
                            // count kilometres in radians
                            NEAR_USER_RADIUS_KM / RADIAN_IN_KM
                        ]
                    }
                },
            });

            res.send(users);
        } catch (e) {
            next(e);
        }
    }
};
