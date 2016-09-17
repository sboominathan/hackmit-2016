var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/find-video', function(req, res, next) {
  res.render('index', { video_name: 'Obama speech' });
});

module.exports = router;
