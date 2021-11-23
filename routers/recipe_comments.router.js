const router = require('express').Router();

const { recipesCommentsControllers } = require('../controllers');
const {
    recipesMiddlewares, validationMiddlewares, authMiddlewares, recipesCommentsMiddlewares
} = require('../middlewares');
const { recipesCommentsValidators } = require('../validators');

const { checkAuthToken } = authMiddlewares;
const { createRecipeComment, updateRecipeComment, deleteRecipeComment } = recipesCommentsControllers;
const { checkRecipeExistsByParam, checkRecipeExists } = recipesMiddlewares;
const {
    checkRecipeCommentExistsByParam,
    checkRecipeCommentExists,
    checkRecipeCommentUserPermission
} = recipesCommentsMiddlewares;
const { validateBySchema } = validationMiddlewares;
const { createRecipeCommentValidator, updateRecipeCommentValidator, correctIdValidator } = recipesCommentsValidators;

router.use(checkAuthToken);

router.post('/',
    validateBySchema('body', createRecipeCommentValidator),
    checkRecipeExistsByParam('recipe_id', 'body', '_id'),
    checkRecipeExists,
    createRecipeComment);

router.patch('/:recipe_comment_id',
    validateBySchema('params', correctIdValidator),
    validateBySchema('body', updateRecipeCommentValidator),
    checkRecipeCommentExistsByParam('recipe_comment_id', 'params', '_id'),
    checkRecipeCommentExists,
    checkRecipeCommentUserPermission,
    updateRecipeComment);

router.delete('/:recipe_comment_id',
    validateBySchema('params', correctIdValidator),
    checkRecipeCommentExistsByParam('recipe_comment_id', 'params', '_id'),
    checkRecipeCommentExists,
    checkRecipeCommentUserPermission,
    deleteRecipeComment);

module.exports = router;
