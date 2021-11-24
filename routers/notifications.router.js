const router = require('express').Router();

const { authMiddlewares } = require('../middlewares');

const { checkAuthToken } = authMiddlewares;

router.use(checkAuthToken);

module.exports = router;
