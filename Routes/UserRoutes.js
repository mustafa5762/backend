const express = require('express');
const UserController = require('../Controllers/UserController');
const User = require('../Models/UserModel');
const userRoutes = express.Router();

userRoutes.get('/users',UserController.getuser)
    //const user = await User.findOneAndUpdate({_id :id}, {$inc : {views : 1}});

userRoutes.post('/register',UserController.register)

userRoutes.post('/login',UserController.login)


module.exports=userRoutes;