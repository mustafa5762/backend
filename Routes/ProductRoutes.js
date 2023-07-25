const express = require('express');
const ProductController = require('../Controllers/ProductController');
const productRoutes = express.Router();
;



  


productRoutes.get('/products', ProductController.getproducts);
productRoutes.get('/products/:id', ProductController.getproduct);
productRoutes.get('/productsd/:id', ProductController.deleteproduct);
productRoutes.post('/products', ProductController.postproducts);

module.exports=productRoutes;