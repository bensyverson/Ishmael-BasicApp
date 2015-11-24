'use strict';

var Ishmael = require('ishmael');
var View = View || Ishmael.View;
var Control = Control || Ishmael.Control;

var StoryView = function(templateName, aName, cb) {
	View.call(this, 'list.html#story', aName, cb);
	
	// The HTML template contains a reference to a `UIButton` object. Using the auto layout feature of Ishmael, it can be automatically created and connected to this view. All we have to do is declare an instance variable here.
	this.closeButton = null;

	this.registerClass('StoryView');
};

StoryView.prototype = Object.create(View.prototype);
StoryView.prototype.constructor = StoryView;

StoryView.prototype.close = function() {
	var self = this;
	console.log("Well, someone wants us to close.");
};

module.exports = StoryView;
