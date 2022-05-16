const express = require('express');
const multer = require('multer');
const Magazine = require('../Models/magazineModel');

const magazineRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,  './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage })

magazineRoutes.post('/magazines', upload.single("file"), async (req, res) => {
    const magazine = new Magazine({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        uploaderId: req.body.id,
        file: req.file.path,
    })
    const save = await magazine.save();
    res.send({message: 'File Uploaded Succesfully'})
})

magazineRoutes.post('/magazinesu', async (req, res) => {
    const update = await Magazine.findByIdAndUpdate(req.body.id,{
      title: req.body.title,
      text: req.body.text,
    });
    res.send({message: 'Updated Successfully'});
});


magazineRoutes.get('/magazines', async(req,res) => {
    const found = await Magazine.find({ })
    res.send(found);
  })

  magazineRoutes.get('/magazines/:id', async(req,res) => {
    const found = await Magazine.findById(req.params.id)
    res.send(found);
  })

  magazineRoutes.get('/md/:id', async(req,res) => {
    const found = await Magazine.findByIdAndDelete(req.params.id);
    res.send({message: 'Deleted Successfully'});
  });



module.exports=magazineRoutes;