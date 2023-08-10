const express = require('express');
const CategoryController = require('../Controllers/CategoryController');
const categoryRoutes = express.Router();

categoryRoutes.get('/categories', CategoryController.getcategories);
categoryRoutes.post('/categories', CategoryController.postcategory);

module.exports=categoryRoutes;