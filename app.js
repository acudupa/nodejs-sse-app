var server = require("./server");
var router = require("./router");
var requestHandlers = require ("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/stream"] = requestHandlers.stream;
handle["/update"] = requestHandlers.update;
handle["/retrieve"] = requestHandlers.retrieve;

server.start(router.route, handle);
