const router = require('express').Router();

const { authControllers } = require('../controllers');
const { validationMiddlewares } = require('../middlewares');
const { authMiddlewares } = require('../middlewares');
const { authValidators } = require('../validators');

const { register } = authControllers;
const { validateBySchema } = validationMiddlewares;
const { registerValidator } = authValidators;
const { checkUserExistsByParam, checkUserNotExists } = authMiddlewares;


router.post('/sign_up',
    validateBySchema('body', registerValidator),
    checkUserExistsByParam('email', 'body'),
    checkUserNotExists,
    register);

module.exports = router;
