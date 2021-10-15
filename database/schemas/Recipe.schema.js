const { Schema, model } = require('mongoose');

const { dbTablesEnum, recipesCategoriesEnum } = require('../../constants');

const { recipe, user } = dbTablesEnum;

const RecipeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    products: {
        type: Array,
        required: true,
        default: []
    },
    comments: {
        type: Array,
        required: true,
        default: []
    },
    ratings: {
        type: Array,
        required: true,
        default: []
    },
    recipe_category: {
        type: String,
        required: true,
        enum: Object.values(recipesCategoriesEnum)
    },
}, { timestamps: true });

module.exports = model(recipe, RecipeSchema);
