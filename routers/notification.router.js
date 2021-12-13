const router = require('express').Router();

const {
    authMiddlewares, notificationMiddlewares, validationMiddlewares, userMiddlewares
} = require('../middlewares');
const { notificationValidators } = require('../validators');
const { notificationControllers } = require('../controllers');

const { checkAuthToken } = authMiddlewares;
const { checkNotificationExistsByParam, checkNotificationExists } = notificationMiddlewares;
const { checkUserPermissionByParam } = userMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { readNotificationValidator } = notificationValidators;
const { readNotification, getNotifications } = notificationControllers;

router.use(checkAuthToken);

router.get('/', getNotifications);

router.post('/read/:notification_id',
    validateBySchema('params', readNotificationValidator),
    checkNotificationExistsByParam('notification_id', 'params', '_id'),
    checkNotificationExists,
    checkUserPermissionByParam('notification_id', 'params'),
    readNotification);

module.exports = router;
