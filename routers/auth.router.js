const router = require('express').Router();

const { authControllers } = require('../controllers');
const { validationMiddlewares } = require('../middlewares');
const { userMiddlewares } = require('../middlewares');
const { authValidators } = require('../validators');

const { register, login } = authControllers;
const { validateBySchema } = validationMiddlewares;
const { registerValidator, loginValidator } = authValidators;
const { checkUserExistsByParam, checkUserNotExists, checkUserExists } = userMiddlewares;


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

module.exports = router;
