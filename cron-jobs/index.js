const cron = require('node-cron');

const removeExpiredTokens = require('./remove-expired-tokens');

module.exports = () => {
    cron.schedule('0 0 * * *', async () => {
        await removeExpiredTokens();
    });
};
