const router = require('express').Router();

const { authMiddlewares, notificationMiddlewares, validationMiddlewares } = require('../middlewares');
const { notificationValidators } = require('../validators');
const { notificationControllers } = require('../controllers');

const { checkAuthToken } = authMiddlewares;
const { checkNotificationExistsByParam, checkNotificationExists } = notificationMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { readNotificationValidator } = notificationValidators;
const { readNotification } = notificationControllers;

router.use(checkAuthToken);

router.post('/read/:notification_id',
    validateBySchema('params', readNotificationValidator),
    checkNotificationExistsByParam('notification_id', 'params', '_id'),
    checkNotificationExists,
    readNotification);

module.exports = router;
