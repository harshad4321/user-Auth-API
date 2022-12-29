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





router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
  })
})


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {

  })
})





module.exports = router;
