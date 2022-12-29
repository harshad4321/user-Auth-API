var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'user-Auth-API' });
});


router.get('/user', (req, res) => {
  res.render('user-signup')
})
module.exports = router;
