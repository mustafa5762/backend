const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    approved: Boolean,
    date: { type: Date, default: Date.now },
});

const Auth = mongoose.model('User', authSchema);

module.exports=Auth;