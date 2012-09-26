function ListWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Recently added',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
		parentWindow: parentWindow,
	});
	
	var table = Ti.UI.createTableView({
		top: 10,
		//style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(table);
	
	table.addEventListener('click', function(event) {
		var ContactDetailWindow = require('ui/windows/ContactDetailWindow');
		self.containingTab.open(new ContactDetailWindow(self, event.rowData.contact));
	});
	
	self.populateTable = function() {
		var tableData = [],
			lastHeading,
			AppContacts = require('data/AppContacts'),
			appContacts = AppContacts.getAll();
		
		// Loop through app contacts in reverse order (newset first)
		appContacts.reverse().forEach(function(appContact) {
			// Get model including associated phone data
			var Contact = require('model/Contact'),
				contact = new Contact(appContact);
			
			// Only display if we have some details 
			// (the phone contact may have been deleted)				
			if (contact.firstName) {
				var row = {
					title: contact.getName(),
					hasDetail: true,
					className: 'listItem',
					contact: contact
				};
				// Add heading for first of each group
				var heading = contact.getDateHeading();
				if (heading != lastHeading) {
					row.header = heading;
					lastHeading = heading;
				}
				// Add row to table
				tableData.push(row);	
			}
		});
		
		table.setData(tableData);
	}
	
	// Build the table each time this window is shown
	self.addEventListener('focus', self.populateTable);

	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ListWindow;
