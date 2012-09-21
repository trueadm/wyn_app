function ListWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'List',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	var table = Ti.UI.createTableView();
	self.add(table);
	
	self.populateTable = function() {
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
		
		table.setData(data);
	}
	
	self.addEventListener('focus', self.populateTable);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ListWindow;
