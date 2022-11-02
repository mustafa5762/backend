const express = require('express');
const ProductController = require('../Controllers/ProductController');
const productRoutes = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


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

productRoutes.get('/products', ProductController.getproducts);
productRoutes.get('/products/:id', ProductController.getproduct);
productRoutes.get('/productsd/:id', ProductController.deleteproduct);
productRoutes.post('/products',  upload.single("image"), ProductController.postproducts);

module.exports=productRoutes;