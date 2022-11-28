const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    blogID: String,
    body: String,
    date_added: { type: Date, default: Date.now },
    added_by: {username: String, email: String, image: String},
    likes: [String],
    replies: [{body: String,date_added: { type: Date, default: Date.now },added_by: {username: String, email: String, image: String}}]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports=Comment;