const bcrypt = require('bcrypt');

const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { BAD_REQUEST } } = require('../constants');


module.exports = {
    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        return hashedPassword;
    },

    comparePassword: async (password, hashedPassword) => {
        const passwordMatched = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatched) {
            throw new CustomError('Invalid credentials', BAD_REQUEST);
        }
    }
};
