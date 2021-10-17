const cron = require('node-cron');

const removeExpiredTokens = require('./remove-expired-tokens');

module.exports = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Cron job runs');

        await removeExpiredTokens();

        console.log('Cron job ends');
    });
};
