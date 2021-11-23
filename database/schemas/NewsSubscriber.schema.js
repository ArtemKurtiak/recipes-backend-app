const { Schema, model } = require('mongoose');

const NewsSubscriberSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

module.exports = model('news_subscriber', NewsSubscriberSchema);
