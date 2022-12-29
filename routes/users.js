var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('user-signup')
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
  userHelpers.doLogin(req.body)
})





module.exports = router;
