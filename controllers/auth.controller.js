const { Auth, User, Cart } = require('../database');
const { statusCodesEnum: { CREATED, NO_CONTENT }, emailsEnum } = require('../constants');
const { jwtService, passwordService, emailService } = require('../services');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const hashedPassword = await passwordService.hashPassword(password);

            const user = await User.create({
                ...req.body,
                password: hashedPassword
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

            res
                .status(CREATED)
                .json({
                    token
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

            res
                .status(200)
                .json({
                    token,
                    user
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
    }
};
