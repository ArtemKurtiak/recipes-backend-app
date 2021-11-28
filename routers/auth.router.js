const router = require('express').Router();

const { authControllers } = require('../controllers');
const { validationMiddlewares, userMiddlewares, authMiddlewares } = require('../middlewares');
const { authValidators } = require('../validators');

const {
    register, login, logout, forgetPassword, resetPassword
} = authControllers;
const { validateBySchema } = validationMiddlewares;
const {
    registerValidator, loginValidator, forgetPasswordValidator, resetPasswordValidator
} = authValidators;
const { checkUserExistsByParam, checkUserNotExists, checkUserExists } = userMiddlewares;
const { checkAuthToken, checkActionToken } = authMiddlewares;

router.post('/sign_up',
    validateBySchema('body', registerValidator),
    checkUserExistsByParam('email', 'body'),
    checkUserNotExists,
    register);

router.post('/login',
    validateBySchema('body', loginValidator),
    checkUserExistsByParam('email', 'body'),
    checkUserExists,
    login);

router.post('/logout',
    checkAuthToken,
    logout);

router.post('/forget-password',
    validateBySchema('body', forgetPasswordValidator),
    checkUserExistsByParam('email', 'body'),
    checkUserExists,
    forgetPassword);

router.post('/reset-password',
    checkActionToken,
    validateBySchema('body', resetPasswordValidator),
    resetPassword);

module.exports = router;
