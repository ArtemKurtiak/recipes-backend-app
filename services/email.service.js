const path = require('path');
const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');

const {
    APP_EMAIL, APP_EMAIL_PASSWORD, statusCodesEnum, EMAIL_SERVICE
} = require('../constants');
const CustomError = require('../errors/CustomError');
const templatesData = require('../email-templates');

const { NOT_FOUND } = statusCodesEnum;

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: APP_EMAIL,
        pass: APP_EMAIL_PASSWORD
    }
});

const sendEmail = async (email, letterType, data = {}) => {
    const template = templatesData[letterType];

    if (!template) {
        throw new CustomError('Letter template not found', NOT_FOUND);
    }

    const { subject } = template.config;

    const letterHtml = await templateParser.render(template.templateName, data);

    await transporter.sendMail({
        from: 'COOKASY',
        to: email,
        subject,
        html: letterHtml
    });
};

module.exports = {
    sendEmail
};
