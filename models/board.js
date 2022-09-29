//DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CONSTRUCTOR
const boardSchema = new Schema ({
    createPost: String,
    userId: String,

}, {timestamps: true});

module.exports = mongoose.model('Board', boardSchema);