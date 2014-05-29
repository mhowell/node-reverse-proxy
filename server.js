'use strict';

var express = require("express");
var logger = require("morgan");
var http = require("http");
var request = require("request");

var app = express();

app.set('port', (process.env.PORT || 1337 ));


app.use(logger());

app.all("/api/*", function(req, res, next) {
	request( {url: 'https://www.google.com' + req.path, headers: req.headers, body: req.body }, function(err, remoteResponse, remoteBody) {
		if( err ) {
			console.log(err);
			return res.status(500).end('Error could not connect to remote server'); 
		}
		res.writeHead(remoteResponse.headers);
		res.end(remoteBody);
	});
});

app.use('/', express.static(__dirname + '/webapp'));

http.createServer(app).listen(app.get('port'), function() {
	console.log("Server Started. Listening on " + app.get('port'));
});