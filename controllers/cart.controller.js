const { Cart, User } = require('../database');
const { statusCodesEnum: { CREATED, SUCCESS } } = require('../constants');
const {
    user, recipe_category
} = require('../constants/dbTables.enum');
const { ratings } = require('../constants/recipeSchemaFields.enum');
const { password } = require('../constants');

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

            const { recipes } = await Cart.findOneAndUpdate(
                { user: _id },
                {
                    $pull: {
                        recipes: recipe_id
                    }
                },
                { new: true }
            );

            res
                .status(SUCCESS)
                .json(recipes);
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
                .json(recipes);
        } catch (e) {
            next(e);
        }
    },

    markRecipeAsDone: async (req, res, next) => {
        try {
            const { recipe_id } = req.body;
            const { _id } = req.auth.user;

            await User.findByIdAndUpdate(_id, {
                $push: {
                    doneRecipes: {
                        $each: [recipe_id]
                    }
                }
            });

            const userCart = await Cart.findOneAndUpdate({
                user: _id
            }, {
                $pull: {
                    recipes: recipe_id
                }
            }, { new: true }).populate({
                path: 'recipes',
                populate: {
                    path: user,
                    select: `-v -${password}`
                }
            }).lean();

            console.log(userCart);

            res
                .status(SUCCESS)
                .json({ message: 'Mark as done!', ...userCart });
        } catch (e) {
            next(e);
        }
    }
};
