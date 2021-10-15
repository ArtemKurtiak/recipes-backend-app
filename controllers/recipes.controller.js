const { documentUtil } = require('../utils');
const { Recipe } = require('../database');
const { statusCodesEnum: { SUCCESS, CREATED, NO_CONTENT } } = require('../constants');
const { recipesQueryBuilder } = require('../helpers');

const { normalizeDocument } = documentUtil;

module.exports = {
    getRecipes: async (req, res, next) => {
        try {
            const [
                filter,
                skipAmount,
                sortQuery
            ] = recipesQueryBuilder(req.query);

            const recipes = await Recipe
                .find(filter)
                .skip(skipAmount)
                .sort(sortQuery)
                .select('-__v');

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
    },

    deleteRecipe: async (req, res, next) => {
        try {
            const { recipe_id } = req.params;

            await Recipe.findByIdAndDelete(recipe_id);

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    }
};
