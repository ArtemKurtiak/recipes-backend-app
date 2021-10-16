const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { user, recipe } = dbTablesEnum;

const RecipeRatingSchema = new Schema({
    rating: {
        type: Number,
        enum: [
            1,
            2,
            3,
            4,
            5
        ],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: user
    },
    recipe_id: {
        type: Schema.Types.ObjectId,
        ref: recipe
    }
}, { timestamps: true });

module.exports = model('recipe_rating', RecipeRatingSchema);
