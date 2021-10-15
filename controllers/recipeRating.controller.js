const { RecipeRating, Recipe } = require('../database');
const { normalizeDocument } = require('../utils/document.util');
const { statusCodesEnum: { CREATED } } = require('../constants');

module.exports = {
    rateRecipe: async (req, res, next) => {
        try {
            const { rating, recipe_id } = req.body;
            const { _id: userId } = req.auth.user;

            const recipeRating = await RecipeRating.create({
                rating,
                recipe_id,
                user: userId
            });

            await Recipe.findByIdAndUpdate(recipe_id, {
                $push: {
                    ratings: {
                        $each: [recipeRating._id]
                    }
                }
            });

            const normalizedRecipeRating = normalizeDocument(recipeRating);

            res
                .status(CREATED)
                .json(normalizedRecipeRating);
        } catch (e) {
            next(e);
        }
    }
};
