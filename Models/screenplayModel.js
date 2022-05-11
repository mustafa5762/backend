const mongoose = require('mongoose');

const screenplaySchema = new mongoose.Schema({
    title: String,
    type: String,
    writer: String,
    uploaderId: String,
    file: String,
    date: { type: Date, default: Date.now },
});

const Screenplay = mongoose.model('Screenplay', screenplaySchema);

module.exports=Screenplay;