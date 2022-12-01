const express = require('express');
const CommentController = require('../Controllers/CommentController');
const commentRoutes = express.Router();

commentRoutes.get('/comments/:id', CommentController.getcomments);
commentRoutes.post('/comments', CommentController.postcomment)
commentRoutes.post('/commentsl', CommentController.likecomment)
commentRoutes.post('/commentsul', CommentController.unlikecomment)
commentRoutes.post('/reply', CommentController.reply)

module.exports=commentRoutes;