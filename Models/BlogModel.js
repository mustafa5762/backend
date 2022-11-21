const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String,
    meta_title: String,
    meta_description: String,
    description: String,
    short_description: String,
    category: String,
    onHomePage: Boolean,
    date_added: { type: Date, default: Date.now },
    comments: [{ body: String, date: { type: Date, default: Date.now }, added_by: String, }],
    likes: [String],
    meta_tags: [String],
    tags: [String],
    added_by: String,
    views: Number,
    image: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports=Blog;