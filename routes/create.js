var express = require('express');
var router = express.Router();

$(document).ready(function(){
	console.log("dsd");
    $("#word-button").click(function(){
        $("#words").val($("#word-button").text());
    });
});

router.get('/', function(req, res, next) {
  res.render('create');
});

router.get('/submit-text', function(req, res, next) {
  res.render('create');
});

module.exports = router;