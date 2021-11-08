const router = require('express').Router();

const {
    authMiddlewares, validationMiddlewares, recipesMiddlewares
} = require('../middlewares');
const { recipesControllers } = require('../controllers');
const { recipesValidators } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const {
    getRecipes, createRecipe, updateRecipe, deleteRecipe, likeRecipe, viewRecipe, getRecipeLikes
} = recipesControllers;
const { validateBySchema } = validationMiddlewares;
const {
    createRecipeValidator, updateRecipeValidator, correctIdValidator, correctQueryValidator, reactionsForRecipeValidator
} = recipesValidators;
const { checkRecipeExistsByParam, checkRecipeExists, checkRecipeAlreadyLiked } = recipesMiddlewares;

router.use(checkAuthToken);

router.get('/',
    validateBySchema('query', correctQueryValidator),
    getRecipes);

router.post('/',
    validateBySchema('body', createRecipeValidator),
    createRecipe);

router.patch('/:recipe_id',
    validateBySchema('body', updateRecipeValidator),
    validateBySchema('params', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'params', '_id'),
    checkRecipeExists,
    updateRecipe);

router.delete('/:recipe_id',
    validateBySchema('params', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'params', '_id'),
    checkRecipeExists,
    deleteRecipe);

router.post('/like',
    validateBySchema('body', reactionsForRecipeValidator),
    checkRecipeAlreadyLiked,
    likeRecipe);

router.post('/view',
    validateBySchema('body', reactionsForRecipeValidator),
    viewRecipe);

router.get('/likes',
    validateBySchema('body', reactionsForRecipeValidator),
    getRecipeLikes);

module.exports = router;
