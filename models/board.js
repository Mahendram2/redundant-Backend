//DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//REPLIES
const replieSchema = new Schema({
    body: {type: String},   
}, {timestamps: true}); //APPROX..
//CONSTRUCTOR
const boardSchema = new Schema ({
    createPost: String,
    image: String,
    replies: [replieSchema] //EMBEDED
}, {timestamps: true});

module.exports = mongoose.model('Board', boardSchema);