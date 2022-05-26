const mongoose = require('mongoose');
const express = require('express');

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    video: String,
    uploaderId: String,
    date: { type: Date, default: Date.now },
});

const Other = mongoose.model('Other', videoSchema);

const routerO = express.Router();

routerO.post("/others", async (req, res) => {
    const video = new Other({
        title: req.body.title,
        description: req.body.description,
        video: req.body.video,
        uploaderId: req.body.id,
    })
    const save = await video.save();
    res.send({message: 'Uploaded Succesfully'});
  });

  routerO.post('/othersu', async (req, res) => {
    const update = await Other.findByIdAndUpdate(req.body.id,{
      title: req.body.title,
      description: req.body.description,
    });
    res.send({message: 'Updated Successfully'});
  });



  routerO.get('/others', async(req,res) => {
    const found = await Other.find({ })
    res.send(found);
  })

  routerO.get('/others/:id', async(req,res) => {
    const found = await Other.findById(req.params.id)
    res.send(found);
  })

  routerO.get('/od/:id', async(req,res) => {
    const found = await Other.findByIdAndDelete(req.params.id);
    res.send({message: 'Deleted Successfully'});
  })

  module.exports=routerO;