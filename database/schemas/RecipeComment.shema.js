const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { recipe_comment, recipe, user } = dbTablesEnum;

const RecipeCommentSchema = new Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    recipe_id: {
        type: Schema.Types.ObjectId,
        ref: recipe,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: user,
        required: true
    }
}, { timestamps: true });

module.exports = model(recipe_comment, RecipeCommentSchema);
