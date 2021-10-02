const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

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
    }
}, { timestamps: true });

module.exports = model(recipe, RecipeSchema);
