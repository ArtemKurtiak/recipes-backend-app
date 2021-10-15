const router = require('express').Router();

const { recipeRatingControllers } = require('../controllers');
const { recipeRatingValidators } = require('../validators');
const {
    validationMiddlewares, authMiddlewares, recipesMiddlewares, recipeRatingMiddlewares
} = require('../middlewares');

const { rateRecipeValidator } = recipeRatingValidators;
const { validateBySchema } = validationMiddlewares;
const { checkAuthToken } = authMiddlewares;
const { checkRecipeExistsByParam, checkRecipeExists } = recipesMiddlewares;
const { checkUserRatingExists } = recipeRatingMiddlewares;
const { rateRecipe } = recipeRatingControllers;


router.use(checkAuthToken);

router.post('/',
    validateBySchema('body', rateRecipeValidator),
    checkRecipeExistsByParam('recipe_id', 'body', '_id'),
    checkRecipeExists,
    checkUserRatingExists,
    rateRecipe);

module.exports = router;
