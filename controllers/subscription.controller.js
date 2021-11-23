const { statusCodesEnum: { SUCCESS } } = require('../constants');
const { NewsSubscriber } = require('../database');

module.exports = {
    subscribeNews: async (req, res, next) => {
        try {
            const { email } = req.body;

            const subscriber = await NewsSubscriber.create({
                email
            });

            res
                .status(SUCCESS)
                .json(subscriber);
        } catch (e) {
            next(e);
        }
    }
};
