function TestWindow(parentWindow) {
	var button = Ti.UI.createButton({title: 'foo', style: Ti.UI.iPhone.SystemButtonStyle.DONE});

	var web = Ti.UI.createWebView({
		url: 'http://www.google.com/'
	});
	
	button.addEventListener('click', function () {
		Ti.Geolocation.getCurrentPosition(function(e) {
			console.log(e);
		});
	})
	
	var self = Ti.UI.createWindow({
		title:'Test',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: 'orange',
		backButtonTitle: 'Get back!',
		tabBarHidden: true,
		rightNavButton: button
	});
	
	var textField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS,
		hintText : 'Focus to see keyboard with toolbar',
		returnKeyType: 'foo',
		color: '#336699',
		top: 10, left: 10,
		width: 250, height: 60
	});
	self.add(textField);

	//self.add(web);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = TestWindow;