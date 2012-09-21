function EditDetailsWindow(parentWindow, title) {
	var self = Ti.UI.createWindow({
		title: title,
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});

	//if we have no parent, i.e. we are using app for the first time to add details
	//we'll hide the tabgroup as its only being used for the titlebar
	
	if(parentWindow == undefined) {
		self.tabBarHidden = true;
	}
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = EditDetailsWindow;
