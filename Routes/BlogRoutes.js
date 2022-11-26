const express = require('express');
const blogRoutes = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const BlogController = require('../Controllers/BlogController');


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

blogRoutes.get('/blogs', BlogController.getblogs);
blogRoutes.get('/blogslikes/:id', BlogController.getlikes);
blogRoutes.post('/blogl', BlogController.likeblog);
blogRoutes.post('/blogul', BlogController.unlikeblog);
blogRoutes.get('/blog/:id', BlogController.getblog);
blogRoutes.get('/blogsd/:id', BlogController.deleteblog);
blogRoutes.post('/blogs',  upload.single("image"), BlogController.postblogs);

module.exports=blogRoutes;