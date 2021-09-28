const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN, statusCodesEnum: { NOT_AUTHORIZED } } = require('../constants');
const CustomError = require('../errors/CustomError');


module.exports = {
    generateToken: async () => {
        const token = await jsonwebtoken.sign({}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return token;
    },

    verifyToken: (token) => {
        try {
            jsonwebtoken.verify(token, JWT_SECRET);
        } catch (e) {
            throw new CustomError('Invalid Jwt token', NOT_AUTHORIZED);
        }
    }
};
