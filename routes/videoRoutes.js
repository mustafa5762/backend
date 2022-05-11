const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Video = require('../Models/videoModel');
const videoRouter = express.Router();

cloudinary.config({ 
    cloud_name: 'ds2zccx0d', 
    api_key: '965123266177967', 
    api_secret: 'k_-gx3XFuoKPae13Iwz_caFD3T0' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV",
      resource_type: 'video'
    },
  });
  
  const upload = multer({ storage: storage });

  videoRouter.post("/videos", upload.single("video"), async (req, res) => {
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        shortDescription: req.body.shortDescription,
        director: req.body.director,
        video: req.file.path,
        category: req.body.category,
        uploaderId: req.body.id,
    })
    const save = await video.save();
    res.send({message: 'File Uploaded Succesfully'});
  });

  videoRouter.post('/videosu', async (req, res) => {
    const update = await Video.findByIdAndUpdate(req.body.id,{
      title: req.body.title,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      director: req.body.director,
      category: req.body.category
    });
    res.send({message: 'Updated Successfully'});
  });



  videoRouter.get('/videos', async(req,res) => {
    const found = await Video.find({ })
    res.send(found);
  })

  videoRouter.get('/videos/:id', async(req,res) => {
    const found = await Video.findById(req.params.id)
    res.send(found);
  })

  videoRouter.get('/vd/:id', async(req,res) => {
    const found = await Video.findByIdAndDelete(req.params.id);
    res.send({message: 'Deleted Successfully'});
  });


module.exports=videoRouter;