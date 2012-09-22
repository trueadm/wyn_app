function Contact(appContact) {
	
	var self = {
		id: appContact.id,
		lat: appContact.lat,
		lon: appContact.lon,
		created: new Date(appContact.created),		
	};
   	
   	var phoneContact = Ti.Contacts.getPersonByID(self.id);
   	
	if (phoneContact) {
		self.firstName = phoneContact.firstName;
		self.lastName = phoneContact.lastName;	
	}
	
	self.getName = function() {
		var name = self.firstName;
		if (self.lastName) {
			name += ' ' + self.lastName;
		}
		return name;
	}
	
	self.getDateHeading = function() {
		// Todo
		var now = new Date(),
			created = self.created;
			
		if (created.getDate() == now.getDate() 
			&& created.getMonth() == now.getMonth() 
			&& created.getYear() == now.getYear()) {
				
			return 'Today';			
		}  else if (created.getDate() == now.getDate() - 1 
			&& created.getMonth() == now.getMonth() 
			&& created.getYear() == now.getYear()) {
			
			return 'Yesterday';
		} else {
			return 'Ages ago';
		}
	}
	
	return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = Contact;