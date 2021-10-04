const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { recipe, user, recipe_category } = dbTablesEnum;

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
    recipe_category: {
        type: Schema.Types.ObjectId,
        ref: recipe_category,
        required: true
    }
}, { timestamps: true });

module.exports = model(recipe, RecipeSchema);
