//DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//REPLY
const replieSchema = new Schema({
    body: {type: String},
    userId: String,
}, {timestamps: true});
//CONSTRUCTOR
const postSchema = new Schema(
  {
    title: String,
    image: String,
    content: String,
    createdBy: String,
    replies: [replieSchema],
    userIdPost: String,
    // postedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
