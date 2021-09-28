const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = require('../constants');

module.exports = {
    generateToken: async () => {
        const token = await jsonwebtoken.sign({}, JWT_SECRET);

        return token;
    }
};
