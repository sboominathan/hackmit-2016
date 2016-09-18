var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('create');
});

router.get('/submit-text', function(req, res, next) {
  res.render('create');
});

module.exports = router;