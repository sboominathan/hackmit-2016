var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');

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

});

module.exports = router;