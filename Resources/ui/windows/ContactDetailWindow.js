function ContactDetailWindow(contact) {
	
	var self = Ti.UI.createWindow({
		title: contact.getName(),
		backgroundColor:'#eee',
		barColor: '#0ba711',
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