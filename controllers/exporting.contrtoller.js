const { Recipe } = require('../database');

const { csvFileNamesEnum } = require('../constants');
const { downloadCsv } = require('../services/exporting.service');

module.exports = {
    exportRecipesToCsv: async (req, res, next) => {
        try {
            const recipes = await Recipe.find();

            const filePath = await downloadCsv(csvFileNamesEnum.recipes, recipes, Object.keys(recipes[0].toJSON()));

            res.download(filePath, csvFileNamesEnum.recipes);
        } catch (e) {
            next(e);
        }
    }
};
