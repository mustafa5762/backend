const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    director: String,
    video: String,
    category: String,
    uploaderId: String,
    date: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

module.exports=Video;