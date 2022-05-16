const express = require('express');
const catRouter = express.Router();
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    type: String,
    date: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', catSchema);

catRouter.post('/categories', async (req,res) => {
    const newCat = new Category({
        name: req.body.name,
        type: req.body.type,
    });
    const saved = await newCat.save();
    res.send(saved);
});

catRouter.get('/categories/:type', async (req,res) => {
    const getCat = await Category.find({ type: req.params.type });
    res.send(getCat);
});


module.exports=catRouter;


