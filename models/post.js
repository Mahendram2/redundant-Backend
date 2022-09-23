//DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//REPLY
const replieSchema = new Schema({
    body: {type: String},
}, {timestamps: true});
const postSchema = new Schema ({
    title: String,
    createdby: String,
    replies: [replieSchema]

}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
const postSchema = new Schema(
  {
    title: String,
    createdBy: String,
    replies: [replieSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
