'use strict';

var Ishmael = require('ishmael');

// Because this same code will run in the browser and node, you can use this simple pattern to get a basic class such as a View:
var View = View || Ishmael.View;
var ViewController = ViewController || Ishmael.ViewController;
var App = App || Ishmael.App;

// First-party
var StoryListView = StoryListView || require('./storylistview.js');

// Ishmael uses a very basic classical inheritance model. This provides a baseline. If you want to get fancy, feel free!
var BasicApp = function() {
	// Here's where we apply the constructor of the superclass:
	App.apply(this, arguments);

	// By default, an app does nothing. We're going to instantiate a new `StoryListView` (see `storylistview.js`), add it to a generic view controller, and add it to our app's stack of viewControllers.
	var storyListView = new StoryListView();
	var aViewController = new ViewController('/', storyListView);
	if (aViewController) {
		this.viewControllers.push(aViewController);
		aViewController.setApp(this);
	}

	// blah
	this.requirePaths = [
		'../../../lib/',
		'./',
	];

	// Finally, we register this class as 'BasicApp'. Because we're faking classical inheritance and JavaScript has no real object introspection, we need this to know what class an object is. 
	this.registerClass('BasicApp');
};
// Complete the inheritance by copying the prototype for our superclass, and make sure the constructor is the function we just defined.
BasicApp.prototype = Object.create(App.prototype);
BasicApp.prototype.constructor = BasicApp;

module.exports = BasicApp;
