const router = require('express').Router();

const { checkAuthToken } = require('../middlewares/auth.middleware');
const { recipesCategoriesControllers } = require('../controllers');

const { getRecipesCategories } = recipesCategoriesControllers;

router.use(checkAuthToken);

router.get('/', getRecipesCategories);

module.exports = router;

