const { RecipeComment } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { NOT_FOUND, FORBIDDEN } } = require('../constants');

module.exports = {
    checkRecipeCommentExistsByParam: (paramName, objectToFind = 'body', dbName = paramName) => async (req, res, next) => {
        try {
            const paramValue = req[objectToFind][paramName];

            const recipeComment = await RecipeComment.findOne({ [dbName]: paramValue });

            req.recipeComment = recipeComment;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeCommentExists: (req, res, next) => {
        try {
            const { recipeComment } = req;

            if (!recipeComment) {
                throw new CustomError('Recipe comment not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeCommentUserPermission: (req, res, next) => {
        try {
            const { user: { _id: userId } } = req.auth;

            const { user } = req.recipeComment;

            if (user.toString() !== userId.toString()) {
                throw new CustomError('Forbidden', FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
