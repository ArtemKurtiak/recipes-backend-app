const CustomError = require('../errors/CustomError');
const { RecipeRating } = require('../database');
const { statusCodesEnum } = require('../constants');

const { CONFLICT } = statusCodesEnum;

module.exports = {
    checkUserRatingExists: async (req, res, next) => {
        try {
            const { _id: userId } = req.auth.user;
            const { recipe_id } = req.body;

            const userRating = await RecipeRating.findOne({ user: userId, recipe_id });

            if (userRating) {
                throw new CustomError('You have already rated this recipe', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
