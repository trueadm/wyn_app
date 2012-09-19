function SettingsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Settings',
		backgroundColor:'white',
		parentWindow: parentWindow
	});
	
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = SettingsWindow;
