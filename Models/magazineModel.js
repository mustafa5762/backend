const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
    title: String,
    category: String,
    uploaderId: String,
    text: String,
    file: String,
    date: { type: Date, default: Date.now },
});

const Magazine = mongoose.model('Magazine', magazineSchema);

module.exports=Magazine;