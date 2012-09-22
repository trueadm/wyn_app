function ThankYouWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Thank You!',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		// Empty view to remove back button
		leftNavButton: Titanium.UI.createView({}),
		barColor: '#0ba711',
	});
	
	var button = Ti.UI.createButton({
		title: 'Add another number'
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		self.close();
		self.parentWindow.close();
		self.parentWindow.parentWindow.clear();
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ThankYouWindow;
