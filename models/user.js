const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    image: {type: String, default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'},
    bio: String,
  },
  { timestamps: true }
);
/*
timestamps enabled to true?

This creates two fields on each new document

- createdAt
- updatedAt
*/

module.exports = mongoose.model('User', userSchema);
