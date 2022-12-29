var express = require('express');

var router = express.Router();
const userHelpers = require('../helpers/user-helpers');
const middleware = require("../middleware");

const protect = require('../middleware/auth')
const generateToken = require('../utils/generateToken')


// GET: display the signup  
router.get('/', middleware.verifyNotLogin,
  async (req, res) => {
    // checking SignupErr
    res.render('user-signup', { "SignupErr": req.session.userSignupErr })
    req.session.userSignupErr = null

  });




// POST: handle the signup logic
router.post(
  '/signup',

  (req, res) => {
    userHelpers.exists(req.body).then((response) => {
      if (response.status) {
        req.session.userSignupErr = "Email already exists"
        res.redirect('/users')
      } else {
        userHelpers.doSignup(req.body).then((response) => {
          req.session.loggedIn = true
          req.session.user = response
          let user = req.session.user._id;
          const token = generateToken({ user });
          console.log({ token: token })
          res.cookie('jwt', token, { httpOnly: true });
          res.redirect('/')
        })
      }
    });
  })


//login form concept


// GET: display the login form
router.get('/login', (req, res) => {
  // check if a user is logged in or not
  console.log('user>>>>>.', req.session.user);
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('login', { "loginErr": req.session.userLoginErr, })
    req.session.userLoginErr = null

  }
});


// POST: handle the signin logic
router.post(
  '/login',

  (req, res) => {
    userHelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.loggedIn = true,
          console.log('req.session.loggedIn>><<<', req.session.loggedIn)
        req.session.user = response.user
        let user = req.session.user._id;
        const token = generateToken({ user });
        console.log({ token: token })
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/')
      } else {
        req.session.userLoginErr = "Invalid Email or password, try again!"
        res.redirect('/users/login')
      }
    });
  });




// GET: logout
router.get('/logout', middleware.verifyLogin, (req, res) => {
  req.session.user = null
  // req.session.user=false
  res.clearCookie('jwt')
  req.session.loggedIn = false
  res.redirect('/')
})




module.exports = router;
