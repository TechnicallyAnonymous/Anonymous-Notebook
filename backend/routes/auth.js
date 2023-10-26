const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');  // bcrypt helps in hashing or adding salt 
var jwt = require('jsonwebtoken');   // Json Web Token helps to verify the user. When the user is created we will give them a token. Next time when user needs to access he have to give his token.
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagood$boy";  // This is signature(which is the last element of jwt)

// ROUTE 1 :  Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid Name').isLength({ min: 1 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  body('confirmPassword', 'Password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

  let success = false;

  
  // If there are errors, return bad request and the errors 
  // validationResult(req) gives errors which we get if above given properties are not fulfilled.
  const ErrResult = validationResult(req);
  
  if (!ErrResult.isEmpty()) {
    return res.status(400).json({success, errors: ErrResult.array() })
  }
  
  // Check whether the user with this email exist already
  try {
    
    // if req.body.email is same the it gives whole data(means true) else it will give null(means false).
    let user = await User.findOne({ email: req.body.email })
    
    
    if (user) {
      return res.status(400).json({success, error: 'Sorry, a user with this email already exists' })
    }
    
    //If confirm password is not same as password it will return error.
    if(req.body.password!==req.body.confirmPassword){
      return res.status(400).json({success, error: 'Confirm password is not same' })
    }
    
    // Securing the password
    const salt = await bcrypt.genSalt(10);  // bcrypt.gensalt will generate a salt
    secpass = await bcrypt.hash(req.body.password, salt);  // it will add salt and then hash the password

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    });
    
    
    const data = {
      user: {
        id: user.id  // because id of the user will be always unique
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET); // this will give a jwt which will contain data and at last signature(JWT_SECRET)
    
    success = true;
    res.json({success, authToken });  // this will give authtoken in response
    
    // If any error occur in above code it will send a bad request
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2 :  Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  
], async (req, res) => {

  let success = false;
  
  // If there are errors, return bad request and the errors 
  // validationResult(req) gives errors which we get if above given properties are not fulfilled.
  const ErrResult = validationResult(req);
  
  if (!ErrResult.isEmpty()) {
    // return res.send(req.body);
    return res.status(400).json({success, errors: ErrResult.array() })
  }

  const { email, password } = req.body; // Object destructuring

  try {
    // if email is find then it will return whole object and if it is not find it will return null.
    let user = await User.findOne({ email }) 

    // if same email is not find it will return null and (not null) is true.
    if (!user) {
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    // here (passeord) is the password which user is entered now to login and (user.password) is the password which user set when he created his account 
    //it returns true or false
    const passwordCompare = await bcrypt.compare(password, user.password);


    if (!passwordCompare) {
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id  // because id of the user will be always unique
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET); // this will give a jwt which will contain data and at last signature(JWT_SECRET)
    
    // res.json(user);
    success = true; 
    res.json({success, authToken });  // this will give authtoken in response
    
    // If any error occur in above code it will send a bad request
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 3 :  Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    // as we have put req.user = data of authToken in fetchuser.js(middleware)
    userId = req.user.id;

    // if user with same id is find then it will return the whole object
    // select helps in adding or removing data(not from the db). "-password" will remove the password key and value in the returning object.
    const user = await User.findById(userId).select("-password");

    // this send response of whole user data without password(because of above)
    res.send(user);
    
    // If any error occur in above code it will send a bad request
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error");

  }
})

module.exports = router;