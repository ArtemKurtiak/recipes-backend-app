const json2csv = require('json2csv');
const fs = require('fs/promises');

const { CSV_DOWNLOADS_URL } = require('../constants');

module.exports = {
    async downloadCsv(fileName, data, fields) {
        const csv = await json2csv.parse(
            data,
            {
                fields
            }
        );

        await fs.writeFile(`${process.cwd()}${CSV_DOWNLOADS_URL}/${fileName}`, csv);

        const file = `${process.cwd()}${CSV_DOWNLOADS_URL}/${fileName}`;

        await fs.readFile(file, 'utf-8');

        return `${process.cwd()}${CSV_DOWNLOADS_URL}/${fileName}`;
    }
};
