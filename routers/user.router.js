const router = require('express').Router();

const { authMiddlewares, userMiddlewares, validationMiddlewares } = require('../middlewares');
const { userControllers } = require('../controllers');
const { userValidators, correctQueryValidator } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const {
    checkUserExistsByParam,
    checkUserExists,
    checkUserAlreadyFollowing,
    checkUserNotToFollowYourSelf,
    checkUserFollowing
} = userMiddlewares;
const { validateBySchema } = validationMiddlewares;
const {
    getMe, followUser, unfollowUser, getUserFollowers, getUserFollowsFor, checkIn, checkOut, getUserLikes, getNearUsers
} = userControllers;
const { correctUserIdValidator, followersValidator, optionalUserIdValidator } = userValidators;

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

router.get('/followers',
    validateBySchema('query', followersValidator),
    getUserFollowers);

router.get('/follows_for',
    validateBySchema('query', followersValidator),
    getUserFollowsFor);

router.post('/checkin', checkIn);

router.post('/checkout', checkOut);

router.get('/likes/:user?',
    validateBySchema('query', correctQueryValidator),
    validateBySchema('params', optionalUserIdValidator),
    getUserLikes);

router.get('/near_users', getNearUsers);

module.exports = router;
