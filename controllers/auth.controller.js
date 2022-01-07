const {
    Auth, User, Cart, ActionToken
} = require('../database');
const {
    statusCodesEnum: { CREATED, NO_CONTENT }, emailsEnum, FRONT_END_URL, dbTablesEnum, photoTypesEnum,
    DEFAULT_USER_IMAGE
} = require('../constants');
const {
    jwtService, passwordService, emailService, s3Service
} = require('../services');
const { SUCCESS } = require('../constants/statusCodes.enum');
const { normalizeDocument } = require('../utils/document.util');

module.exports = {
    register: async (req, res, next) => {
        try {
            const {
                password, email, latitude, longitude
            } = req.body;
            let { image: userImage = DEFAULT_USER_IMAGE } = req.body;

            if (req.files && req.files.image) {
                const { image } = req.files;

                const path = await s3Service.uploadFile(image, photoTypesEnum.USER);

                userImage = path;
            }

            const hashedPassword = await passwordService.hashPassword(password);

            const user = await User.create({
                ...req.body,
                password: hashedPassword,
                image: userImage,
                location: [
                    latitude,
                    longitude
                ],
            });

            const token = await jwtService.generateToken();

            await Auth.create({
                user: user._id,
                token
            });

            await Cart.create({
                user: user._id
            });

            await emailService.sendEmail(email, emailsEnum.successRegistration);

            const normalizedUser = normalizeDocument(user);

            res
                .status(CREATED)
                .json({
                    token,
                    user: normalizedUser
                });
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordService.comparePassword(password, user.password);

            const token = await jwtService.generateToken();

            await Auth.create({
                user: user._id,
                token
            });

            const normalizedUser = normalizeDocument(user);

            res
                .status(200)
                .json({
                    token,
                    user: normalizedUser
                });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { token } = req.auth;

            await Auth.findOneAndDelete({ token });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    forgetPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { user: { _id: user } } = req;

            const token = await jwtService.generateActionToken();

            await ActionToken.create({
                token,
                user
            });

            await emailService.sendEmail(email, emailsEnum.forgetPassword, {
                link: `${FRONT_END_URL}/auth/forget-password?actionToken=${token}`
            });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { user, token } = req.auth;
            const { password } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            await User.findByIdAndUpdate(user._id, { password: hashedPassword });

            await Auth.deleteMany({ user: user._id });

            await ActionToken.deleteOne({ token });

            res
                .status(SUCCESS)
                .json({ updated: true });
        } catch (e) {
            next(e);
        }
    }
};
