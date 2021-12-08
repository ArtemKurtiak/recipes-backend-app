const router = require('express').Router();

const { subscriptionControllers } = require('../controllers');
const { validationMiddlewares, subscribeMiddlewares, userMiddlewares } = require('../middlewares');
const { subscriptionValidators } = require('../validators');

const { subscribeNews } = subscriptionControllers;
const { validateBySchema } = validationMiddlewares;
const { checkUserAlreadySubscribed } = subscribeMiddlewares;
const { checkUserExistsByParam, checkUserExists } = userMiddlewares;
const { subscribeNewsValidator } = subscriptionValidators;

router.post('/news',
    validateBySchema('body', subscribeNewsValidator),
    checkUserExistsByParam('email', 'body'),
    checkUserExists,
    checkUserAlreadySubscribed,
    subscribeNews);

module.exports = router;
