const { Schema, model } = require('mongoose');

const { recipesCategoriesEnum, dbTablesEnum } = require('../../constants');

const { recipe_category } = dbTablesEnum;

const RecipeCategory = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        enum: Object.values(recipesCategoriesEnum)
    },

}, { timestamps: true });

module.exports = model(recipe_category, RecipeCategory);
