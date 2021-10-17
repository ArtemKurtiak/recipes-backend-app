const { Auth } = require('../database');
const { jwtService } = require('../services');

const { verifyToken } = jwtService;

const removeExpiredTokens = async () => {
    const tokens = await Auth.find();

    tokens.forEach(async (token) => {
        try {
            verifyToken(token.token);
        } catch (err) {
            await Auth.deleteOne({ token: token.token });
        }
    });
};

module.exports = removeExpiredTokens;
