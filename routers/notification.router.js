const router = require('express').Router();

const {
    authMiddlewares, notificationMiddlewares, validationMiddlewares, userMiddlewares
} = require('../middlewares');
const { notificationValidators } = require('../validators');
const { notificationControllers } = require('../controllers');

const { checkAuthToken } = authMiddlewares;
const { checkNotificationExistsByParam, checkNotificationExists } = notificationMiddlewares;
const { checkUserExistsByParam, checkUserExists } = userMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { readNotificationValidator, correctUserIdValidator } = notificationValidators;
const { readNotification, getNotifications } = notificationControllers;

router.use(checkAuthToken);

router.get('/:user_id',
    validateBySchema('params', correctUserIdValidator),
    checkUserExistsByParam('user_id', 'params', '_id'),
    checkUserExists,
    getNotifications);

router.post('/read/:notification_id',
    validateBySchema('params', readNotificationValidator),
    checkNotificationExistsByParam('notification_id', 'params', '_id'),
    checkNotificationExists,
    readNotification);

module.exports = router;
