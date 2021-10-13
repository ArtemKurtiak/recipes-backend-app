const { emailsEnum } = require('../constants');

const { successRegistration } = emailsEnum;

module.exports = {
    [successRegistration]: {
        templateName: successRegistration,
        config: {
            subject: 'Success registration'
        }
    }
};
