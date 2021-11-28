const { emailsEnum } = require('../constants');

const { successRegistration, forgetPassword } = emailsEnum;

module.exports = {
    [successRegistration]: {
        templateName: successRegistration,
        config: {
            subject: 'Success registration'
        }
    },
    [forgetPassword]: {
        templateName: forgetPassword,
        config: {
            subject: 'Forget password'
        }
    }
};
