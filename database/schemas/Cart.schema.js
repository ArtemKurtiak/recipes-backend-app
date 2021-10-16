const { model, Schema } = require('mongoose');
const { dbTablesEnum } = require('../../constants');

const { recipe } = dbTablesEnum;

const CartSchema = new Schema({
    recipes: {
        type: Array,
        required: true,
        default: [],
        ref: recipe
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: recipe,
        required: true
    }
}, { timestamps: true });

module.exports = model('cart', CartSchema);
