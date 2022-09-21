const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema ({

}, {timestamps: true});

module.exports = mongoose.model('Board', boardSchema);