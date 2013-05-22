var http =  require ("http");
var url = require ("url");
function start(route, handle){
	function onRequest(request, response) {
			var pathname = url.parse(request.url).pathname;
			var querystring = url.parse(request.url).query;

			route(handle, pathname, response, querystring);
                }
	http.createServer(onRequest ).listen(8888);
}
exports.start = start;
