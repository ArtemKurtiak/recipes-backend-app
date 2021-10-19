const { statusCodesEnum } = require('../constants');
const { documentUtil } = require('../utils');

const { SUCCESS } = statusCodesEnum;
const { normalizeDocument } = documentUtil;

module.exports = {
    getMe: (req, res, next) => {
        try {
            const { user } = req.auth;

            const normalizedUser = normalizeDocument(user);

            res
                .status(SUCCESS)
                .json({ ...normalizedUser });
        } catch (e) {
            next(e);
        }
    },

    followUser: (req, res, next) => {
        try {
            res.send('In progress'); // TODO !!
        } catch (e) {
            next(e);
        }
    }
};
