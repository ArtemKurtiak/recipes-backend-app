const { Schema, model } = require('mongoose');

const { dbTablesEnum, recipesCategoriesEnum, recipeSchemaFieldsEnum } = require('../../constants');

const {
    recipe, user, recipe_comment, recipe_rating, version, recipe_id
} = dbTablesEnum;
const { comments, ratings } = recipeSchemaFieldsEnum;

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
    [comments]: [{ type: Schema.Types.ObjectId, ref: recipe_comment }],
    [ratings]: [{ type: Schema.Types.ObjectId, ref: recipe_rating }],
    recipe_category: {
        type: String,
        required: true,
        enum: Object.values(recipesCategoriesEnum)
    },
}, { timestamps: true });

function populateSchema() {
    this.populate({
        path: comments,
        select: `-${recipe_id} -${version}`,
        populate: {
            path: user,
            select: `-${version}`
        }
    });
    this.populate({
        path: ratings,
        select: `-${recipe_id} -${version} -${user}`
    });
    this.populate({
        path: user,
        select: `-${version}`
    });
}

RecipeSchema.pre('find', populateSchema);

RecipeSchema.pre('findOneAndUpdate', populateSchema);

module.exports = model(recipe, RecipeSchema);
