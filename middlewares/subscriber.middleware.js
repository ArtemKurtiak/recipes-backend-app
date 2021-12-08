const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { BAD_REQUEST } } = require('../constants');
const { NewsSubscriber } = require('../database');

module.exports = {
    checkUserAlreadySubscribed: async (req, res, next) => {
        try {
            const { email } = req.body;

            const subscriber = await NewsSubscriber.findOne({ email });

            if (subscriber) {
                throw new CustomError('You have already been subscribed', BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
