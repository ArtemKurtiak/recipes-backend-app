const { User } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { CONFLICT, NOT_FOUND } } = require('../constants');

module.exports = {
    checkUserExistsByParam: (paramName, objectToFind = 'body', dbName = paramName) => async (req, res, next) => {
        try {
            const paramValue = req[objectToFind][paramName];

            const user = await User.findOne({ [dbName]: paramValue });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserNotExists: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new CustomError('Email already in use', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExists: (req, res, next) => {
        try {
            const { user: userId } = req.body;
            const { user } = req;

            if (!user && userId) {
                throw new CustomError('User not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserAlreadyFollowing: (req, res, next) => {
        try {
            const { user } = req.auth;
            const { user: userToFollow } = req.body;

            if (user.followsFor.includes(userToFollow)) {
                throw new CustomError('You are already following this user', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserNotToFollowYourSelf: (req, res, next) => {
        try {
            const { _id: currentUserId } = req.auth.user;
            const { user } = req.body;

            if (user === currentUserId.toString()) {
                throw new CustomError('You can`t follow yourself', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserFollowing: (req, res, next) => {
        try {
            const { user } = req.auth;
            const { user: userToFollow } = req.body;

            if (!user.followsFor.includes(userToFollow)) {
                throw new CustomError('You don`t follow this user.', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
