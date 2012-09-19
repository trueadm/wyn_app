function NewNumberWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'New Number',
		backgroundColor:'white',
		parentWindow: parentWindow
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('Do Something?'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		alert('Foo');
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = NewNumberWindow;
