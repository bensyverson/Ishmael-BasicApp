'use strict';

// Third-party
var Ishmael = require('ishmael');
var View = View || Ishmael.View;
var PutStuffHere = PutStuffHere || require('putstuffhere');

var StoryListView = function(templateName, aName, cb) {
	// We'll subclass `View`, and use the `#list` element of `list.html` as our template.
	View.call(this, 'templates/list.html#list', aName, cb);
	// Add a simple instance variable to hold our headlines.

	this.stories = [];
	this.registerClass('StoryListView');
};
StoryListView.prototype = Object.create(View.prototype);
StoryListView.prototype.constructor = StoryListView;


StoryListView.prototype.createSubviews = function() {
	var self = this;
	
	self.randomView = null;
	// This method is in charge of creating any necessary subviews based on the view's state. You can be clever here and reuse existing views, but for now, we'll just wipe them out…
	self.removeAllSubviews();
	// …and recreate them.
	for (var i = 0; i < self.stories.length; i++) {
		// We're going to create a new view based on the `#story` element in `list.html`
		var aView = new View('templates/list.html#story');
		aView.locals = self.stories[i];
		self.addSubview(aView);
	}
};

StoryListView.prototype.close = function(aControl, aControlEvent) {
	var self = this;
	var storyView = aControl.superview;

	var storyIndex = self.subviews.indexOf(storyView);
	if (storyIndex > -1) {
		self.stories.splice(storyIndex, 1);
		storyView.removeFromSuperview();
	}
};

module.exports = StoryListView;
