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
	PutStuffHere.shared().setTemplateRoot(__dirname);
}

// Route our static file requests to the proper places:
app.use('/js/modules', express.static('node_modules'));
app.use('/js', express.static('lib'));
app.use('/css', express.static('templates/css'));
app.use('/templates', express.static('templates'));


// For simplicity's sake, we'll only set up a single rout for the app, under `/app`.
app.get('/', function(req,res){
	// Instantiate the app:
	var appInstance = new BasicApp(); 
	// Load our app data.
	loadData(function(err, aPlaylist){
		// Set the data in our view.
		if (aPlaylist) appInstance.rootViewController().view.stories = aPlaylist;

		appInstance.rootViewController().loadView(function(){ 
			// Here we have the opportunity to do more before alerting the view controller that it's fully loaded. For now, we'll just call `viewDidLoad`.
			appInstance.rootViewController().viewDidLoad();

			// At this point, the app and its views are loaded. We could simply send the HTML, but we're going to use `packAndShipFromPath` to put the entire app state on ice.
			appInstance.packAndShipFromPath('/', function(err, html){
				if (err) return res.status(500).send("Whoops!");

				// Now we have the HTML of the app, along with the reviver shim, but it still needs to be sent within an html and body tag, etc. Often this is handled by a framework, but we're using bare Express.
				var data = fs.readFileSync(path.resolve(__dirname, 'templates/wrapper.html'));
				var template = data.toString('utf8');

				// Our template contains the phrase "put html here"—we'll replace that with our HTML.
				template = template.replace(/put html here/, html);

				// Send the whole thing!
				res.send(template);
			});
		});
	});
});

// Start the server
var server = app.listen(1851, function(){
	console.log("Visit http://localhost:1851/");
});


// Helper function to load recent Flickr photos
var loadData = function(cb){
	var stories = [];
	PutStuffHere.shared().ajax.getViaStandardHTTP('http://api.flickr.com/services/feeds/photos_public.gne?tags=travelwide&tagmode=all&format=json&nojsoncallback=1', function(err, body){
		if (!err && body) {
			var str = body.replace(/\\'/g, '\'');
			var aList = JSON.parse(str);
			if (aList && aList.items) {
				stories = aList.items.map(function(photo){
					var mediaUrl = photo.media ? photo.media.m : null;
					// Do a little Flickr URL manipulation to get a bigger image:
					if (mediaUrl) mediaUrl = mediaUrl.replace(/_m.jpg$/, '_c.jpg');
					return {
						headline: photo.title,
						imageLink: photo.link,
						imageUrl: mediaUrl,
					}
				});
			} 
		}
		if (typeof(cb) === typeof(function(){})) cb(err, stories);
	});
};

// For more, see the documentation for [basicapp.js](basicapp.html) and [storylistview.js](storylistview.html)
