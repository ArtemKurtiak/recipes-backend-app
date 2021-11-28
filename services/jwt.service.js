const jsonwebtoken = require('jsonwebtoken');

const {
    JWT_SECRET_ACTION,
    JWT_SECRET_AUTH,
    JWT_AUTH_EXPIRES_IN,
    statusCodesEnum: {
        NOT_AUTHORIZED
    },
    tokensTypesEnum
} = require('../constants');
const CustomError = require('../errors/CustomError');


module.exports = {
    generateToken: async () => {
        const token = await jsonwebtoken.sign({}, JWT_SECRET_AUTH, { expiresIn: JWT_AUTH_EXPIRES_IN });

        return token;
    },

    verifyToken: (token, tokenType = tokensTypesEnum.ACCESS) => {
        try {
            const jwtSecret = tokenType === tokensTypesEnum.ACCESS ? JWT_SECRET_AUTH : JWT_SECRET_ACTION;

            jsonwebtoken.verify(token, jwtSecret);
        } catch (e) {
            throw new CustomError('Invalid Jwt token', NOT_AUTHORIZED);
        }
    },

    generateActionToken: async () => {
        const token = await jsonwebtoken.sign({}, JWT_SECRET_ACTION);

        return token;
    }
};
