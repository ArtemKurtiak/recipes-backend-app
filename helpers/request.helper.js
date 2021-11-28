const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { NOT_AUTHORIZED } } = require('../constants');

module.exports = {
    getAuthToken: (headers) => {
        const { authorization } = headers;

        if (!authorization) {
            throw new CustomError('Jwt token not found', NOT_AUTHORIZED);
        }

        const token = authorization.split(' ')[1];

        return token;
    }
};
