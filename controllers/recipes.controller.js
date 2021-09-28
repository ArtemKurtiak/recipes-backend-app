const { Recipe } = require('../database');
const { statusCodesEnum: { SUCCESS } } = require('../constants');

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
    }
};
