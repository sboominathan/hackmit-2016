var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var bodyParser = require('body-parser');



router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/submit-text', function(req, res, next) {

  var input_text = req.body.words;

  var pyshell = new pythonShell('./routes/audio.py');

  var dict_string = JSON.stringify(word_dict)


  pyshell.send(input_text);
  pyshell.send(dict_string);

  pyshell.on('message', function (message) {
  
  		console.log(message)
	
	}); 

  pyshell.end(function (err) {
  	// if(err) {throw err;}
  	res.render('result')
  });
  
  console.log(req.body);
  console.log(req.body.words);

});

module.exports = router;