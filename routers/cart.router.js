const router = require('express').Router();

const { cartControllers } = require('../controllers');
const {
    recipesMiddlewares, validationMiddlewares, authMiddlewares, cartMiddlewares, userMiddlewares
} = require('../middlewares');
const { cartValidators } = require('../validators');

const { correctIdValidator } = cartValidators;
const { checkRecipeAlreadyInCart, checkRecipeExistsInCart } = cartMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { checkRecipeExistsByParam, checkRecipeExists } = recipesMiddlewares;
const { checkAuthToken } = authMiddlewares;
const { checkUserPermissionByParam } = userMiddlewares;
const { addRecipeToCart, removeRecipeFromCart, getUserCart } = cartControllers;

router.use(checkAuthToken);

router.post('/add',
    validateBySchema('body', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'body', '_id'),
    checkRecipeExists,
    checkRecipeAlreadyInCart,
    addRecipeToCart);

router.post('/remove',
    validateBySchema('body', correctIdValidator),
    checkRecipeExistsByParam('recipe_id', 'body', '_id'),
    checkRecipeExists,
    checkRecipeExistsInCart,
    checkUserPermissionByParam('recipe_id'),
    removeRecipeFromCart);

router.get('/',
    getUserCart);

module.exports = router;
