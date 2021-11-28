const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    amount: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = model(dbTablesEnum.product, ProductSchema);
