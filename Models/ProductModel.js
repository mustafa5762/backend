const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: String,
    inStock: Boolean,
    description: String,
    short_description: String,
    additional_info: String,
    category: String,
    onHomePage: Boolean,
    date_added: { type: Date, default: Date.now },
    reviews: [{ body: String, date: { type: Date, default: Date.now }, number: Number, added_by: String, }],
    colors: [{name: String, class: String, selectedClass: String}],
    sizes: [{ name: String, inStock: Boolean }],
    tags: [String],
    added_by: String,
    views: Number,
    image: String,
    images: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports=Product;