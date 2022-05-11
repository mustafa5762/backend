const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    userId: String,
    date: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

module.exports=Article;