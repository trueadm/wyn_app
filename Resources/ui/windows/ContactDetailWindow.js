function ContactDetailWindow(contact) {
	
	var self = Ti.UI.createWindow({
		title: contact.getName(),
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
	});
	
	var data = [
		{title: contact.getName()}
	];
	
	var table = Ti.UI.createTableView({
		data: data
	});
	self.add(table);
	
	return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ContactDetailWindow;