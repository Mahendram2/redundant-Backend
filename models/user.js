const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: { type: String, required: true },
<<<<<<< HEAD
    image: {type: String, default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'},
=======
    image: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    },
>>>>>>> 36d1f4a1a160650ac32f8d161d32aa06bdd825b6
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
