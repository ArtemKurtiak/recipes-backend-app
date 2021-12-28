const { RecipeCategory } = require('../database');
const { statusCodesEnum } = require('../constants');

module.exports = {
    getRecipesCategories: async (req, res, next) => {
        try {
            const categories = await RecipeCategory.find();

            res
                .status(statusCodesEnum.SUCCESS)
                .json(categories);
        } catch (e) {
            next(e);
        }
    }
};
