const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    bio: String,
}, { timestamps: true });
/*
timestamps enabled to true?

This creates two fields on each new document

- createdAt
- updatedAt
*/

module.exports = mongoose.model('User', userSchema);