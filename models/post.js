//DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//REPLY
const replieSchema = new Schema({
    body: {type: String},
}, {timestamps: true});
//CONSTRUCTOR
const postSchema = new Schema(
  {
    title: String,
    createdBy: String,
    replies: [replieSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
