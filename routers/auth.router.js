const router = require('express').Router();

const { authControllers } = require('../controllers');
const { validationMiddlewares, userMiddlewares, authMiddlewares } = require('../middlewares');
const { authValidators } = require('../validators');

const { register, login, logout } = authControllers;
const { validateBySchema } = validationMiddlewares;
const { registerValidator, loginValidator } = authValidators;
const { checkUserExistsByParam, checkUserNotExists, checkUserExists } = userMiddlewares;
const { checkAuthToken } = authMiddlewares;

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

module.exports = router;
