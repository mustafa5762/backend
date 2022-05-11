const express = require('express');
const multer = require('multer');
const Screenplay = require('../Models/screenplayModel');

const screenplayRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,  './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage })

screenplayRoutes.post('/screenplays', upload.single("file"), async (req, res) => {
    const screenplay = new Screenplay({
        title: req.body.title,
        type: req.body.type,
        writer: req.body.writer,
        uploaderId: req.body.id,
        file: req.file.path,
    })
    const save = await screenplay.save();
    res.send({message: 'File Uploaded Succesfully'})
});


screenplayRoutes.post('/screenplaysu', async (req, res) => {
  const update = await Screenplay.findByIdAndUpdate(req.body.id,{
    title: req.body.title,
    type: req.body.type,
    writer: req.body.writer
  });
  res.send({message: 'Updated Successfully'});
});



screenplayRoutes.get('/screenplays', async(req,res) => {
    const found = await Screenplay.find({ })
    res.send(found);
  })

  screenplayRoutes.get('/screenplays/:id', async(req,res) => {
    const found = await Screenplay.findById(req.params.id)
    res.send(found);
  })

  screenplayRoutes.get('/sd/:id', async(req,res) => {
    const found = await Screenplay.findByIdAndDelete(req.params.id);
    res.send({message: 'Deleted Successfully'});
  });



module.exports=screenplayRoutes;