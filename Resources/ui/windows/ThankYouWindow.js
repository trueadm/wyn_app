function ThankYouWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Thank You!',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		// Empty view to remove back button
		leftNavButton: Titanium.UI.createView({}),
		barColor: '#0ba711',
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ThankYouWindow;
