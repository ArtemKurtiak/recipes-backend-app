const CustomError = require('../errors/CustomError');
const { Recipe } = require('../database');
const { statusCodesEnum: { NOT_FOUND, CONFLICT } } = require('../constants');

module.exports = {
    checkRecipeExistsByParam: (paramName, objectToFind = 'body', dbName = paramName) => async (req, res, next) => {
        try {
            const paramValue = req[objectToFind][paramName];

            const recipe = await Recipe.findOne({ [dbName]: paramValue });

            req.recipe = recipe;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeExists: (req, res, next) => {
        try {
            const { recipe } = req;

            if (!recipe) {
                throw new CustomError('Recipe not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeAlreadyLiked: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;
            const { recipe } = req.body;

            const recipe1 = await Recipe.findOne({ _id: recipe }).lean();

            if (recipe1.likes.includes(_id)) {
                throw new CustomError('You have already liked this recipe', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeAlreadyDone: async (req, res, next) => {
        try {
            const { recipe_id } = req.body;
            const { doneRecipes } = req.auth.user;

            if (doneRecipes.includes(recipe_id)) {
                throw new CustomError('You have already done this recipe', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
