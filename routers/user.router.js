const router = require('express').Router();

const { authMiddlewares, userMiddlewares, validationMiddlewares } = require('../middlewares');
const { userControllers } = require('../controllers');
const { userValidators } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const { checkUserExistsByParam, checkUserExists } = userMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { getMe, followUser } = userControllers;
const { followUserValidator } = userValidators;

router.use(checkAuthToken);

router.get('/me', getMe);

router.post('/follow',
    validateBySchema('body', followUserValidator),
    checkUserExistsByParam('user', 'body', '_id'),
    checkUserExists,
    followUser);

module.exports = router;
