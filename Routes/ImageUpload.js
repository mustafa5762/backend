const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const imageUpload = express.Router();
const multer = require('multer')



cloudinary.config({ 
    cloud_name: 'dvd2l9ley', 
    api_key: '113394777693127', 
    api_secret: 'IcompCoB4vOGWubh01C6nZXGd-U' 
});
  
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV",
    },
});

const upload = multer({ storage: storage });

imageUpload.post('/upload_image', upload.single("image"), (req,res) => {
    res.send(req.file.path)
});

module.exports=imageUpload;