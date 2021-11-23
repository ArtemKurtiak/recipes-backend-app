const router = require('express').Router();

const { subscriptionControllers } = require('../controllers');
const { validationMiddlewares, subscribeMiddlewares } = require('../middlewares');
const { subscriptionValidators } = require('../validators');

const { subscribeNews } = subscriptionControllers;
const { validateBySchema } = validationMiddlewares;
const { checkUserAlreadySubscribed } = subscribeMiddlewares;
const { subscribeNewsValidator } = subscriptionValidators;

router.post('/news',
    validateBySchema('body', subscribeNewsValidator),
    checkUserAlreadySubscribed,
    subscribeNews);

module.exports = router;
