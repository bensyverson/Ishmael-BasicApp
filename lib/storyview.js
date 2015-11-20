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


StoryView.prototype.activate = function(cb) {
	var self = this;

	// Again, we never created or assigned `closeButton` in this class; the layout engine takes care of it for us. Here in `activate()`, we're adding a target for its action.
	self.closeButton.addTargetActionForControlEvents(Control.EventTouchUpInside, function(){
		console.log("Close button " + self.closeButton.uniqueId());
	});
	// Once we're done, we call the same method on our superclass.
	View.prototype.activate.apply(self, arguments);
};

module.exports = StoryView;
