const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replieSchema = new Schema ({
body :{type: String},
}, {timestamps: true});

module.exports = mongoose.model('Replie', replieSchema);