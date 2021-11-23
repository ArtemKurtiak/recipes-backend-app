const { Auth } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { NOT_AUTHORIZED }, dbTablesEnum } = require('../constants');
const { jwtService } = require('../services');

const {
    user, password, createdAt, updatedAt, id, notifications
} = dbTablesEnum;

module.exports = {
    checkAuthToken: async (req, res, next) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new CustomError('Jwt token not found', NOT_AUTHORIZED);
            }

            const token = authorization.split(' ')[1];

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
    }
};
