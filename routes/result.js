var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');

router.get('/', function(req, res, next) {
  res.render('result');
});

module.exports = router;