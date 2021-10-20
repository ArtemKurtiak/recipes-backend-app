const router = require('express').Router();

const { authMiddlewares, userMiddlewares, validationMiddlewares } = require('../middlewares');
const { userControllers } = require('../controllers');
const { userValidators } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const {
    checkUserExistsByParam, checkUserExists, checkUserAlreadyFollowing, checkUserNotToFollowYourSelf, checkUserFollowing
} = userMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { getMe, followUser, unfollowUser } = userControllers;
const { correctUserIdValidator } = userValidators;

router.use(checkAuthToken);

router.get('/me', getMe);

router.post('/follow',
    validateBySchema('body', correctUserIdValidator),
    checkUserExistsByParam('user', 'body', '_id'),
    checkUserExists,
    checkUserAlreadyFollowing,
    checkUserNotToFollowYourSelf,
    followUser);

router.post('/unfollow',
    validateBySchema('body', correctUserIdValidator),
    checkUserExistsByParam('user', 'body', '_id'),
    checkUserExists,
    checkUserFollowing,
    unfollowUser);

module.exports = router;
