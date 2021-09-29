const { documentUtil } = require('../utils');
const { Recipe } = require('../database');
const { statusCodesEnum: { SUCCESS, CREATED } } = require('../constants');

const { normalizeDocument } = documentUtil;

module.exports = {
    getRecipes: async (req, res, next) => {
        try {
            const recipes = await Recipe.find();

            res
                .status(SUCCESS)
                .json(recipes);
        } catch (e) {
            next(e);
        }
    },

    createRecipe: async (req, res, next) => {
        try {
            const recipe = await Recipe.create({
                ...req.body
            });

            const normalizedRecipe = normalizeDocument(recipe);

            res
                .status(CREATED)
                .json(normalizedRecipe);
        } catch (e) {
            next(e);
        }
    },

    updateRecipe: async (req, res, next) => {
        try {
            const { recipe_id } = req.params;

            const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, { ...req.body }, { new: true });

            const normalizedRecipe = normalizeDocument(updatedRecipe);

            res
                .status(SUCCESS)
                .json(normalizedRecipe);
        } catch (e) {
            next(e);
        }
    }
};
