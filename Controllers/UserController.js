const User = require("../Models/UserModel");
const registerValidation = require("./Validations/RegsterValidation");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const loginValidation = require("./Validations/loginValidation");

module.exports ={
    getuser: function(req, res){
      res.send('All todos');
    },
    register: async function(req, res){
      const {error} = registerValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      const emailExist = await User.findOne({ email: req.body.email })
      if (emailExist) return res.status(400).send('Email Already Registerd with Another Account');

      const salt = await bcrypt.genSalt(14);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })

      const saveNewUser = await newUser.save();
      const data = {_id:saveNewUser._id}

      const token = await jwt.sign(data, 'shshshshfdlsjdknvsidfusidhfhsdff');
      res.send({accessToken:token, user: {username: saveNewUser.username, email:saveNewUser.email, }});

    },
    login: async function(req, res){
      const {error} = loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const emailExist = await User.findOne({ email: req.body.email })
      if (!emailExist) return res.status(400).send('User Does Not Exist');

      const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);
      if (!checkPassword) return res.status(400).send('Wrong Password');
     
      const data = {_id:emailExist._id}
      const token = await jwt.sign(data, 'shshshshfdlsjdknvsidfusidhfhsdff');
      res.send({accessToken:token, user: {username: emailExist.username, email:emailExist.email, }});
    },
  };
