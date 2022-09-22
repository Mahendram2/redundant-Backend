const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: String,
    createdby: String


}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);