const mongoose = require('mongoose');
const { Schema } = mongoose;

const leadSchema = new Schema({
    company_name: String,
    company_info: String,
    company_email: String,
    company_phone: Number,
    company_category: String,
    company_more_info: String,
    ref: String
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports=Lead;