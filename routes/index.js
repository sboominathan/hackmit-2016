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
	  username: 'ps',
	  password: 'ps',
	  version: 'v1'
	});

	// var files = ['audio_file1.wav'];
	// for (var file in files) {
	//   var params = {
	//     audio: fs.createReadStream(files[file]),
	//     content_type: 'audio/wav',
	//     timestamps: true,
	//     word_alternatives_threshold: 0.9,
	//     continuous: true,
 //      keywords: ["reckon","away"],
 //      keywords_threshold: 0.7
	//   };

	//   speech_to_text.recognize(params, function(error, transcript) {
	//     if (error)
	//       console.log('error:', error);
	//     else
 //        console.log("Done")
	//       console.log(JSON.stringify(transcript, null, 2));
	//   });
	// }
	
  var input_url = req.body.url;
  console.log(input_url);
  var pyshell = new pythonShell('./routes/my_script.py');
  pyshell.send(input_url);
  pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  	console.log(message);
    if(message=="finished1"){
      console.log("watson begin");
      var files = ['audio1.wav'];
      for (var file in files) {
        var params = {
          audio: fs.createReadStream(files[file]),
          content_type: 'audio/wav',
          timestamps: true,
          word_alternatives_threshold: 0.9,
          continuous: true
        };

        speech_to_text.recognize(params, function(error, transcript) {
          if (error)
            console.log('error:', error);
          else
            console.log("Done")
            console.log(JSON.stringify(transcript, null, 2));
        });
      }
    }
	}); 
  

  pyshell.end(function (err) {
  // if (err) {throw err;}
  console.log('finished');
  res.render('index', { video_name: "message" });
	});

});




module.exports = router;
