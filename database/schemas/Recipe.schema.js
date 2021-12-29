const { Schema, model } = require('mongoose');

const { dbTablesEnum, recipeSchemaFieldsEnum } = require('../../constants');
const { password, recipe_category } = require('../../constants/dbTables.enum');

const {
    recipe, user, recipe_comment, recipe_rating, version, recipe_id, likes_count
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
        type: Schema.Types.ObjectId,
        required: true,
        ref: recipe_category
    },
    likes: [{ type: Schema.Types.ObjectId, ref: user }],
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true } });

function populateSchema() {
//    this.populate({
//        path: comments,
//        select: `-${recipe_id} -${version}`,
//        populate: {
//            path: user,
//            select: `-${version}`
//        }
//    });
    this.populate({
        path: ratings,
        select: `-${recipe_id} -${version} -${user}`
    });
    this.populate({
        path: user,
        select: `-${version} -${password}`
    });

    this.populate({
        path: 'recipe_category',
        select: `-${version}`
    });
}

RecipeSchema.pre('find', populateSchema);

RecipeSchema.pre('findOneAndUpdate', populateSchema);

RecipeSchema.virtual(likes_count).get(function() {
    return this.likes.length;
});

module.exports = model(recipe, RecipeSchema);
