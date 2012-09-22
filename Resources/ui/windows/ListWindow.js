function ListWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'List',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	var table = Ti.UI.createTableView({
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(table);
	
	table.addEventListener('click', function(event) {
		var ContactDetailWindow = require('ui/windows/ContactDetailWindow');
		self.containingTab.open(new ContactDetailWindow(parentWindow, event.rowData.contact));
	});
	
	self.populateTable = function() {
		var tableData = [],
			lastHeading;
		
		Ti.App.Properties.getList('numbers').reverse().forEach(function(contactData) {
			
			if (contactData.id) {
				var Contact = require('model/Contact'),
					contact = new Contact(contactData);
								
				if (contact.firstName) {
					var row = {
						title: contact.getName(),
						hasDetail: true,
						contact: contact
					};
					var heading = contact.getDateHeading();
					if (heading != lastHeading) {
						row.header = heading;
						lastHeading = heading;
					}
					tableData.push(row);	
				}
				
			}
		});
		
		table.setData(tableData);
	}
	
	self.addEventListener('focus', self.populateTable);

	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ListWindow;
