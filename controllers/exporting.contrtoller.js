const json2csv = require('json2csv');
const fs = require('fs/promises');

const path = require('path');
const { Recipe } = require('../database');

module.exports = {
    exportRecipesToCsv: async (req, res, next) => {
        try {
            const recipes = await Recipe.find();

            const csv = await json2csv.parse(
                recipes,
                {
                    fields: Object.keys(recipes[0].toJSON())
                }
            );

            await fs.writeFile(`${__dirname}/test.csv`, csv, () => {});
            console.log('example handler 1');
            const file = `${__dirname}/test.csv`;

            const data = await fs.readFile(file, 'utf-8');
            console.log(`the data is ${data}`);
            res.download(file, 'the-test-file.csv', (err) => {
                if (err) {
                    res.status(500).send('error');
                } else {
                    console.log('file was downloaded');
                }
            });
        } catch (e) {
            next(e);
        }
    }
};
