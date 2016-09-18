$(document).ready(function(){
	console.log("dsd");
    $(".word-button").click(function(){
    	var newText = $(this).text().trim();
       	var currText = $("#words").val();
        $("#words").val(currText + " " + newText);
    });
});