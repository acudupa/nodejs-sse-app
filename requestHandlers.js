var exec = require("child_process").exec;
var Memjs = require('memjs');
var memjs = Memjs.Client.create();
var lifetime = 86400; //24hrs

function start(response, querystring) {
		var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" method="post">'+
'<textarea name="text" rows="20" cols="60"></textarea>'+
'<input type="submit" value="Submit text" />'+
'</form>'+
'</body>'+
'</html>';
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
}

function upload(response, querystring) {
	console.log("Request handler upload was called");
	response.writeHead(200, {"Content-Type":"text/plain"}); 
	response.write("Hello Upload");
	response.end(); 
}

function stream(response, querystring){
	console.log("Request handler stream was called");
	response.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});
    	//response.write("retry: 10000\n");
    	//response.write("event: connecttime\n");
    	//response.write("data: " + (new Date()) + "\n\n");
    	//response.write("data: " + (new Date()) + "\n\n");
	var data = "empty";

    	interval = setInterval(function() {
		memjs.get('action', function( err, result ){
  		if( err ) console.error( err );
  		console.dir( result );
		data = result;
		});
      		response.write("data: " + (data) + "\n\n");
    	}, 1000);
}

function update(response, querystring){
	console.log("Request handler update was called");
	console.log(querystring.indexOf("42342"));

	if (querystring.indexOf("play") !== -1){
		memjs.set('action', 'play', lifetime, function( err, result ){
  		//if( err ) console.error( err );
  		console.dir( result );
		});
	}
	else if (querystring.indexOf("pause") !== -1){
		memjs.set('action', 'pause', lifetime, function( err, result ){
  		//if( err ) console.error( err );
  		console.dir( result );
		});
	}


	response.writeHead(200, {"Content-Type":"text/plain"}); 
	response.write("Action Updated!");
	response.end();
}

function retrieve(response, querystring){
	console.log("Request handler retrieve was called");
	var data = "empty";
	memjs.get('action', function( err, result ){
  		if( err ) console.error( err );
  		console.dir( result );
		data = result;
		response.writeHead(200, {"Content-Type":"text/plain"}); 
		response.write(data);
		response.end();
		});
}


exports.start = start;
exports.upload = upload;
exports.stream = stream;
exports.update = update;
exports.retrieve = retrieve;
