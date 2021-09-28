const router = require('express').Router();

const { authMiddlewares } = require('../middlewares');
const { recipesControllers } = require('../controllers');

const { checkAuthToken } = authMiddlewares;
const { getRecipes } = recipesControllers;

router.use(checkAuthToken);

router.get('/', getRecipes);

module.exports = router;
