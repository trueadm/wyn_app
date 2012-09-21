function ListWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'List',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	var data = [];
	
	Ti.App.Properties.getList('numbers').forEach(function(item) {
		var person = Ti.Contacts.getPersonByID(item.id);
		if (person) {
			data.push({
				id: item.id,
				title: person.firstName,
				hasChild: true
			});		
		}
	});
	data.reverse();
	
	var table = Ti.UI.createTableView({
		data: data
	});
	
	self.add(table);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ListWindow;
