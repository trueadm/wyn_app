function MyNumbersWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'My Numbers',
		backgroundColor:'white',
		parentWindow: parentWindow
	});
	
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = MyNumbersWindow;
