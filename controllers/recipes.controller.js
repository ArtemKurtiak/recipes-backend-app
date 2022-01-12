const { documentUtil } = require('../utils');
const { Recipe, Product } = require('../database');
const {
    statusCodesEnum: {
        SUCCESS, CREATED, NO_CONTENT, BAD_REQUEST
    }, photoTypesEnum
} = require('../constants');
const { recipesQueryBuilder } = require('../helpers');
const { s3Service } = require('../services');
const CustomError = require('../errors/CustomError');
const { user, products, likes } = require('../constants/dbTables.enum');
const { ratings } = require('../constants/recipeSchemaFields.enum');

const { normalizeDocument } = documentUtil;

module.exports = {
    getRecipes: async (req, res, next) => {
        try {
            const [
                filter,
                skipAmount,
                sortQuery,
                limit
            ] = recipesQueryBuilder(req.query);

            const recipes = await Recipe
                .find(filter)
                .skip(skipAmount)
                .sort(sortQuery)
                .limit(limit)
                .select('-__v');

            res
                .status(SUCCESS)
                .json(recipes);
        } catch (e) {
            next(e);
        }
    },

    createRecipe: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;

            if (req.files && req.files.image) {
                const { image } = req.files;

                const path = await s3Service.uploadFile(image, photoTypesEnum.RECIPE);

                const recipe = await Recipe.create({
                    ...req.body,
                    user: _id,
                    image: path
                });

                if (recipe.products) {
                    recipe.products.forEach(async (item) => {
                        await Product.create({ ...item });
                    });
                }

                const normalizedRecipe = normalizeDocument(recipe);

                res
                    .status(CREATED)
                    .json(normalizedRecipe);

                return;
            }

            throw new CustomError('Image not found', BAD_REQUEST);
        } catch (e) {
            next(e);
        }
    },

    updateRecipe: async (req, res, next) => {
        try {
            const { recipe_id } = req.params;

            const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, { ...req.body }, { new: true });

            const normalizedRecipe = normalizeDocument(updatedRecipe);

            res
                .status(SUCCESS)
                .json(normalizedRecipe);
        } catch (e) {
            next(e);
        }
    },

    deleteRecipe: async (req, res, next) => {
        try {
            const { recipe_id } = req.params;

            await Recipe.findByIdAndDelete(recipe_id);

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    likeRecipe: async (req, res, next) => {
        try {
            const { _id } = req.auth.user;
            const { recipe } = req.body;

            await Recipe.findByIdAndUpdate(recipe, {
                $push: {
                    likes: [_id]
                }
            }, { new: true });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    viewRecipe: async (req, res, next) => {
        try {
            const { recipe } = req.body;

            await Recipe.findByIdAndUpdate(recipe, {
                $inc: {
                    views: 1
                }
            });

            res
                .status(NO_CONTENT)
                .json();
        } catch (e) {
            next(e);
        }
    },

    getRecipeLikes: async (req, res, next) => {
        try {
            const { recipe } = req.body;

            const { likes: recipeLikes } = await Recipe.findById(recipe).populate(likes);

            res
                .status(SUCCESS)
                .json({ likes: recipeLikes, count: likes.length });
        } catch (e) {
            next(e);
        }
    },

    getRecipeById: async (req, res, next) => {
        try {
            const { recipe_id } = req.params;

            const recipe = await Recipe
                .findById(recipe_id)
                .populate(user)
                .populate(likes)
                .populate(products)
                .populate({
                    path: ratings,
                    select: '--v',
                    populate: {
                        path: user,
                        select: '-password'
                    }
                });

            res
                .status(SUCCESS)
                .json(recipe);
        } catch (e) {
            next(e);
        }
    }
};
