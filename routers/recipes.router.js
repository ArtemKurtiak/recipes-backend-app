const router = require('express').Router();

const {
    authMiddlewares, validationMiddlewares, userMiddlewares, recipesMiddlewares
} = require('../middlewares');
const { recipesControllers } = require('../controllers');
const { recipesValidators } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const {
    getRecipes, createRecipe, updateRecipe, deleteRecipe
} = recipesControllers;
const { validateBySchema } = validationMiddlewares;
const { checkUserExistsByParam, checkUserExists } = userMiddlewares;
const {
    createRecipeValidator, updateRecipeValidator, correctIdValidator, correctQueryValidator
} = recipesValidators;
const { checkRecipeExistsByParam, checkRecipeExists } = recipesMiddlewares;

router.use(checkAuthToken);

router.get('/',
    validateBySchema('query', correctQueryValidator),
    getRecipes);

router.post('/',
    validateBySchema('body', createRecipeValidator),
    checkUserExistsByParam('user', 'body', '_id'),
    checkUserExists,
    createRecipe);

router.patch('/:recipe_id',
    validateBySchema('body', updateRecipeValidator),
    validateBySchema('params', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'params', '_id'),
    checkRecipeExists,
    checkUserExistsByParam('user', 'body', '_id'),
    checkUserExists,
    updateRecipe);

router.delete('/:recipe_id',
    validateBySchema('params', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'params', '_id'),
    checkRecipeExists,
    deleteRecipe);

module.exports = router;
