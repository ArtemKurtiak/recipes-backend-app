const { Auth, ActionToken } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { NOT_AUTHORIZED }, dbTablesEnum, tokensTypesEnum } = require('../constants');
const { jwtService } = require('../services');
const { requestHelper } = require('../helpers');

const {
    user, password, createdAt, updatedAt, id, notifications
} = dbTablesEnum;

module.exports = {
    checkAuthToken: async (req, res, next) => {
        try {
            const token = requestHelper.getAuthToken(req.headers);

            jwtService.verifyToken(token);

            const auth = await Auth
                .findOne({ token })
                .populate({
                    path: user,
                    select: `-${password} -${createdAt} -${updatedAt} -${id}`,
                    populate: notifications
                });

            req.auth = auth;

            if (!auth) {
                throw new CustomError('Jwt token expired', NOT_AUTHORIZED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const token = requestHelper.getAuthToken(req.headers);

            jwtService.verifyToken(token, tokensTypesEnum.ACTION);

            const auth = await ActionToken
                .findOne({ token })
                .populate({
                    path: user,
                    select: `-${password} -${createdAt} -${updatedAt} -${id}`,
                    populate: notifications
                });

            req.auth = auth;

            if (!auth) {
                throw new CustomError('Jwt token expired', NOT_AUTHORIZED);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
