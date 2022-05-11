const express = require('express');
const Joi = require('joi');
const Auth = require('../Models/authModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const authRoutes = express.Router();

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().min(1).max(30).required(),
});


authRoutes.post('/register', async (req,res) => {
    const error = registerSchema.validate(req.body);
    if(error.error) {
        res.status(400).send(error.error.details[0].message);
        return;
    };

    const alreadyUser = await Auth.findOne({ email:req.body.email })
    if(alreadyUser) {
        res.status(400).send('Email Already Exists');
        return;
    };

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addAuth = new Auth({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        approved: false,
    });
        const user2 = await addAuth.save();
        res.send({message:'User added wait for Approval'});
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
});


authRoutes.post('/login', async(req,res) => {
    const error = loginSchema.validate(req.body);
    if(error.error) {
        res.status(400).send(error.error.details[0].message);
        return;
    };


    const alreadyUser = await Auth.findOne({ email:req.body.email })
    if(!alreadyUser) {
        res.status(400).send('User Does Not Exist');
        return;
    };

    if(alreadyUser.approved===false) {
        res.status(400).send('User is not approved');
        return;
    };


    const checkPassword = await bcrypt.compare(req.body.password, alreadyUser.password);
    if(!checkPassword) {
        res.status(400).send('Wrong Password');
        return;
    };

    const user2 = alreadyUser;
    var token = jwt.sign({ username: user2.username, email: user2.email, _id: user2._id, role: user2.role, date: user2.date }, 'okkiunderstand');
    res.send(token);
});



authRoutes.get('/users', async(req,res) => {
    const allUsers = await Auth.find({ approved:true });
    res.send(allUsers);
});

authRoutes.get('/usersna', async(req,res) => {
    const allUsers = await Auth.find({ approved:false });
    res.send(allUsers);
});


authRoutes.get('/ud/:id', async(req,res) => {
    const allUsers = await Auth.findByIdAndDelete(req.params.id);
    res.send({message: 'User Removed'});
});

authRoutes.get('/users/:id', async(req,res) => {
    const allUsers = await Auth.findById(req.params.id);
    res.send(allUsers);
});


authRoutes.get('/usersu/:id', async(req,res) => {
    const allUsers = await Auth.findByIdAndUpdate(req.params.id, {approved:true});
    res.send({message: 'User Approved'});
});






module.exports=authRoutes;