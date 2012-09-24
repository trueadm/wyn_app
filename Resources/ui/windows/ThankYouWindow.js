function ThankYouWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Thank You!',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
		parentWindow: parentWindow,
		containingTab: parentWindow.containingTab,
		// Empty view to remove back button
		leftNavButton: Titanium.UI.createView({}),
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
	
	var ad = Ti.UI.iOS.createAdView({
		adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
		top: 0,
		left: 0,
	});
	self.add(ad);
	
	return self;
};

module.exports = ThankYouWindow;