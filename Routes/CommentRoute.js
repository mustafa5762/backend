const express = require('express');
const CommentController = require('../Controllers/CommentController');
const commentRoutes = express.Router();

commentRoutes.get('/comments/:id', CommentController.getcomments);
commentRoutes.post('/comments', CommentController.postcomment)

module.exports=commentRoutes;