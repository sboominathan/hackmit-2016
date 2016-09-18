var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var fs = require('fs');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

word_dict = {};
currWords = [];
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
	}); 
 

  pyshell.end(function (err) {
  // if (err) {throw err;}
  	  console.log("watson begin");
      var files = ['audio1.wav'];
      for (var file in files) {
        var params = {
          audio: fs.createReadStream(files[file]),
          content_type: 'audio/wav',
          timestamps: true,
          continuous: true
        };

        speech_to_text.recognize(params, function(error, transcript) {
          if (error)
            console.log('error:', error);
          else {
            console.log("Done")
            console.log(JSON.stringify(transcript, null, 2));
           
			for (var chunk of transcript.results){
			   timestamps = chunk.alternatives[0].timestamps;
			   for (var word_info of timestamps){
			      var word = word_info[0];
			      var start = word_info[1];
			      var end = word_info[2];
			      if (word in word_dict){
			        temp = word_dict[word];
			        temp.push({"start": start, "end": end});
			        word_dict[word] = temp;
			      } else {
			        word_dict[word] = [];
			        word_dict[word].push({"start": start, "end": end});
			      }
			   }
			}

			for (var word of Object.keys(word_dict)){
				currWords.push(word);
			}

			 console.log(currWords);
  			res.render('index', { word_list: currWords });
			
          }
        });
      }
	  console.log('finished'); 
  });

 

});




module.exports = router;
