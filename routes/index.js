var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/find-video', function(req, res, next) {
  res.render('index', { video_name: 'Obama speech' });
  var s = req.body.url;
  // console.log(req.body.url)
  console.log(s);
  var pyshell = new pythonShell('./routes/my_script.py');
  pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	}); 
});


module.exports = router;
