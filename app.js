// # Ishmael BasicApp example
// Ishmael is an isomorphic web app framework, which means the same app code can be run on the server and the browser. This example "freezes" and serves a very simple app via Express/node.js. The browser will get the static HTML version along with a JavaScript shim to "thaw" the entire app and revive it in place. The browser doesn't even need to re-render the page.
//
// To install dependencies:
// 
//     npm install
//
// To run the demo:
//
//     node app.js
//
// Then visit: http://localhost:1851/app/

'use strict';

// ## The code
// Third party requirements:
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var PutStuffHere = require('putstuffhere');

// First party requirements:
var BasicApp = require('./lib/basicapp.js');

// Tell **PutStuffHere**, our template system, where to look for templates.
if (PutStuffHere.shared()) { 
	PutStuffHere.shared().setTemplateRoot(__dirname + '/templates/');
}

// For simplicity's sake, we'll only set up a single rout for the app, under `/app`.
app.get('/app', function(req,res){
	// Instantiate the app,
	var appInstance = new BasicApp(); 
	// and load the main view.
	appInstance.rootViewController().loadView(function(){ 
		// Here we have the opportunity to do more before alerting the view controller that it's fully loaded. For now, we'll just call `viewDidLoad`.
		appInstance.rootViewController().viewDidLoad();

		// At this point, the app and its views are loaded. We could simply send the HTML, but we're going to use `packAndShipFromPath` to put the entire app state on ice.
		appInstance.packAndShipFromPath('/', function(err, html){
			if (err) {
				res.status(500).send("Whoops!");
				return;
			}

			// Now we have the HTML of the app, along with the reviver shim, but it still needs to be sent within an html and body tag, etc.
			var data = fs.readFileSync(path.resolve(__dirname, 'templates/wrapper.html'));
			var template = data.toString('utf8');

			// Our template contains the phrase "put html here"—we'll replace that with our HTML.
			template = template.replace(/put html here/, html);

			// Send the whole thing!
			res.send(template);
		});
	});
});

// Handle requests to /js/ and route them to the proper static files
app.get('/js/*', function(req, res){
	var newPath = req.path;
	// Send anything under `/js/modules/` to our `node_modules` directory
	if (req.path.match(/\/modules/)) {
		newPath = req.path.replace(/\/js\/modules/, 'node_modules/');
	} else {
		// Otherwise, route `/js/` to `lib`
		newPath = req.path.replace(/\/js/, 'lib/');		
	}
	// Send the static data
	var data = fs.readFileSync(path.resolve(__dirname, newPath));
	res.send(data);
});

// Start the server
var server = app.listen(1851, function(){
	console.log("Visit http://localhost:1851/app/");
});

// For more, see the documentation for [basicapp.js](basicapp.html), [storylistview.js](storylistview.html) and [storyview.js](storyview.html)
