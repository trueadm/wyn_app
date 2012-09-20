function YourDetailsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Your Details',
		backgroundColor:'white',
		parentWindow: parentWindow,
		backButtonTitle: 'Back',
		barColor: '#0ba711',
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = YourDetailsWindow;
