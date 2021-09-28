const { Auth, User } = require('../database');
const { statusCodesEnum: { CREATED } } = require('../constants');
const { jwtService, passwordService } = require('../services');



module.exports = {
    register: async (req, res, next) => {
        try {
            const { password } = req.body;

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

            res
                .status(CREATED)
                .json({
                    token
                });
        } catch (e) {
            next(e);
        }
    }
};
