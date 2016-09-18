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
	  username: 'b50770e2-f7a6-40f0-8598-f1e07a09b9bc',
	  password: 'mIBNd15WiKBw',
	  version: 'v1'
	});

	var files = ['I Found An Old Book.flac'];
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
	
  var input_url = req.body.url;
  console.log(input_url);
  var pyshell = new pythonShell('./routes/my_script.py');
  pyshell.send(input_url);
  pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  	console.log(message);
  	res.render('index', { video_name: message });

	}); 

  pyshell.end(function (err) {
  if (err) throw err;
  console.log('finished');
	});

});




module.exports = router;
