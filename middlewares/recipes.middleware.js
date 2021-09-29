const CustomError = require('../errors/CustomError');
const { Recipe } = require('../database');
const { statusCodesEnum: { NOT_FOUND } } = require('../constants');

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
    }
};
