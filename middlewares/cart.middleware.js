const { Cart } = require('../database');
const CustomError = require('../errors/CustomError');
const { statusCodesEnum: { CONFLICT, NOT_FOUND } } = require('../constants');

module.exports = {
    checkRecipeAlreadyInCart: async (req, res, next) => {
        try {
            const { recipe_id } = req.body;
            const { _id } = req.auth.user;

            const userCart = await Cart.findOne({ user: _id });

            if (userCart.recipes.includes(recipe_id)) {
                throw new CustomError('You have already this recipe in cart', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRecipeExistsInCart: async (req, res, next) => {
        try {
            const { recipe_id } = req.body;
            const { _id } = req.auth.user;

            const userCart = await Cart.findOne({ user: _id });

            if (!userCart.recipes.includes(recipe_id)) {
                throw new CustomError('You don`t have this recipe in cart', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
