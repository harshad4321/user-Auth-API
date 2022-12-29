var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('user-signup')
})

router.post('/signup', (req, res) => {

})


module.exports = router;
