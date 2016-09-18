var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/submit-text', function(req, res, next) {
  
  console.log(req.body);
  console.log(req.body.words);
  res.render('create');

});

module.exports = router;