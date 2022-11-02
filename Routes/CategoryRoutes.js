const express = require('express');
const CategoryController = require('../Controllers/CategoryController');
const categoryRoutes = express.Router();

categoryRoutes.get('/categories', CategoryController.getcategories);

module.exports=categoryRoutes;