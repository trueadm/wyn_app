function NewNumberWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'New Number',
		backgroundColor:'white',
		parentWindow: parentWindow
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = NewNumberWindow;
