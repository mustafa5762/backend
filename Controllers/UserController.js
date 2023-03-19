const User = require("../Models/UserModel");
const registerValidation = require("./Validations/RegsterValidation");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const loginValidation = require("./Validations/loginValidation");

module.exports ={
    getuser: function(req, res){
      res.send('All todos');
    },

    // Register User Controller
    register: async function(req, res){

      // Validating data sent by user
      const {error} = registerValidation(req.body);

      // sending error if data sent by user is incorrect
      if (error) return res.status(400).send(error.details[0].message);
      
      // checking if user is already registerd
      const emailExist = await User.findOne({ email: req.body.email })

      // sending error if user already exists
      if (emailExist) return res.status(400).send('Email is ALready In Use');

      // hashing password
      const salt = await bcrypt.genSalt(14);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // storing user in db
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword
      })
      const saveNewUser = await newUser.save();
      const data = {_id:saveNewUser._id}

      // generating jwt and sending to user
      const token = jwt.sign(data, 'shshshshfdlsjdknvsidfusidhfhsdff');
      res.send({accessToken:token, user: {username: saveNewUser.username, email:saveNewUser.email, role: saveNewUser.role }});

    },

    // Login controller
    login: async function(req, res){

      // Validating data sent by user
      const {error} = loginValidation(req.body);

      // sending error if data sent by user is incorrect
      if (error) return res.status(400).send(error.details[0].message);

      // checking if user is registerd
      const emailExist = await User.findOne({ email: req.body.email })

      // sending error if user doesn't exists
      if (!emailExist) return res.status(400).send('User Does Not Exist');

      // checking password
      const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);
      if (!checkPassword) return res.status(400).send('Wrong Password');
     
      // generating jwt and sending to user
      const data = {_id:emailExist._id}
      const token = jwt.sign(data, 'shshshshfdlsjdknvsidfusidhfhsdff');
      res.send({accessToken:token, user: {username: emailExist.username, email:emailExist.email, role: emailExist.role }});
    },
  };
