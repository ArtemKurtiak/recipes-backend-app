const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const { follower } = dbTablesEnum;

const FollowerSchema = new Schema({});

module.exports = model(follower, FollowerSchema);
