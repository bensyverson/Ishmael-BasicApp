'use strict';

// Third-party
var Ishmael = require('ishmael');
var View = View || Ishmael.View;
var PutStuffHere = PutStuffHere || require('putstuffhere');

// First-party
var StoryView = StoryView || require('./storyview.js');

var StoryListView = function(templateName, aName, cb) {
	// We'll subclass `View`, and use the `#list` element of `list.html` as our template.
	View.call(this, 'list.html#list', aName, cb);
	// Add a simple instance variable to hold our headlines.
	this.stories = [];
	this.registerClass('StoryListView');
};


StoryListView.prototype = Object.create(View.prototype);
StoryListView.prototype.constructor = StoryListView;


StoryListView.prototype.createSubviews = function() {
	var self = this;
	
	// This method is in charge of creating subviews based on the view's state. You can be clever here and reuse existing subviews, but for now, we'll just wipe out the existing views and recreate them.
	self.removeAllSubviews();
	for (var i = 0; i < self.stories.length; i++) {
		var aView = new StoryView();
		aView.locals = self.stories[i];
		self.addSubview(aView);
	}
};

module.exports = StoryListView;
