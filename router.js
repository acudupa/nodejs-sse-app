var fs = require("fs");
function route(handle, pathname, response, querystring)
{
	console.log("About to route " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, querystring);
	}
	else if (pathname) {
		var filename = "./"+pathname;
    		fs.exists(filename, function(exists) {
      			if (exists) {
				console.log("Step one complete!" + pathname);
        			fs.readFile(filename, function(error, content) {
          				if (error) {
            					response.writeHead(500);
            					response.end();
          				} else {
            					response.writeHead(200, {"Content-Type":"text/html"});
            					response.end(content, "utf-8");
          				}
        			});
      			} else {
        			response.writeHead(404);
        			response.end();
     	 		}
		});
	}
}

exports.route = route;
