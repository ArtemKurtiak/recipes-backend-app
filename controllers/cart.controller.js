const { Cart } = require('../database');
const { statusCodesEnum: { CREATED, NO_CONTENT, SUCCESS }, dbTablesEnum } = require('../constants');

module.exports = {
    addRecipeToCart: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;

            const { recipe_id } = req.body;

            const cart = await Cart.findOneAndUpdate({ user: _id }, {
                $push: {
                    recipes: {
                        $each: [recipe_id]
                    }
                }
            }, { new: true })
                .populate('recipes')
                .select('-__v');

            res
                .status(CREATED)
                .json(cart);
        } catch (e) {
            next(e);
        }
    },

    removeRecipeFromCart: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;
            const { recipe_id } = req.body;

            await Cart.findOneAndUpdate(
                { user: _id },
                {
                    $pull: {
                        recipes: recipe_id
                    }
                },
                { new: true }
            );

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    getUserCart: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;

            const { recipes } = await Cart.findOne({ user: _id }).populate('recipes');

            res
                .status(SUCCESS)
                .json({ recipes });
        } catch (e) {
            next(e);
        }
    }
};
