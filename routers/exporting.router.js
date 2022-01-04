const router = require('express').Router();

const { authMiddlewares } = require('../middlewares');
const { exportingControllers } = require('../controllers');

const { checkAuthToken } = authMiddlewares;
const { exportRecipesToCsv } = exportingControllers;


router.get('/recipes', exportRecipesToCsv);

module.exports = router;
