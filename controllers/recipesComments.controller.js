const { documentUtil } = require('../utils');
const { statusCodesEnum: { SUCCESS, NO_CONTENT } } = require('../constants');
const { RecipeComment, Recipe } = require('../database');

const { normalizeDocument } = documentUtil;

module.exports = {
    createRecipeComment: async (req, res, next) => {
        try {
            const { recipe_id } = req.body;
            const { user } = req.auth;

            const recipeComment = await RecipeComment.create({
                ...req.body,
                user
            });

            await Recipe.findOneAndUpdate(
                { recipe_id },
                { $push: { comments: { $each: [recipeComment._id], $position: 0 } } }
            );

            const normalizedRecipeComment = normalizeDocument(recipeComment);

            res
                .status(SUCCESS)
                .json(normalizedRecipeComment);
        } catch (e) {
            next(e);
        }
    },

    updateRecipeComment: async (req, res, next) => {
        try {
            const { recipe_comment_id } = req.params;

            const updatedRecipeComment = await RecipeComment.findByIdAndUpdate(recipe_comment_id, { ...req.body }, { new: true });

            const normalizedRecipeComment = normalizeDocument(updatedRecipeComment);

            res
                .status(SUCCESS)
                .json(normalizedRecipeComment);
        } catch (e) {
            next(e);
        }
    },

    deleteRecipeComment: async (req, res, next) => {
        try {
            const { recipe_comment_id } = req.params;

            await RecipeComment.findByIdAndDelete(recipe_comment_id);

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    }
};
