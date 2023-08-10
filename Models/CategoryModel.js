const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    category_name:  String,
    category_description: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports=Category;