var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var fs = require('fs');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* GET home page. */
router.get('/', function(req, res, next) {

	
	  res.render('index');

});

router.post('/find-video', function(req, res, next) {

  var speech_to_text = watson.speech_to_text({
	  username: 'username',
	  password: 'password',
	  version: 'v1'
	});

	var files = ['Steve Jobs 2005 Stanford Commencement Address.flac'];
	for (var file in files) {
	  var params = {
	    audio: fs.createReadStream(files[file]),
	    content_type: 'audio/flac',
	    timestamps: true,
	    word_alternatives_threshold: 0.9,
	    continuous: true
	  };

	  speech_to_text.recognize(params, function(error, transcript) {
	    if (error)
	      console.log('error:', error);
	    else
	      console.log(JSON.stringify(transcript, null, 2));
	  });
	}
	
  res.render('index', { video_name: 'Obama speech' });
  var s = req.body.url;
  console.log(s);
  var pyshell = new pythonShell('./routes/my_script.py');
  pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	}); 

});




module.exports = router;
