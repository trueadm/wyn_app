function Contact(appContact) {
	
	var self = {
		id: 		appContact.id,
		coords: 	appContact.coords,
		places: 	appContact.places,
		created: 	new Date(appContact.created),		
	};
   	
   	// Get data from assocatiated phone contact entry
   	var phoneContact = Ti.Contacts.getPersonByID(self.id);
   	
	if (phoneContact) {
		self.firstName = phoneContact.firstName;
		self.lastName = phoneContact.lastName;
		self.phone = phoneContact.phone;
		self.email = phoneContact.email;
		self.image = phoneContact.image;
	}
	
	/**
	 * Get full formatted name
	 */
	self.getName = function() {
		var name = self.firstName;
		if (self.lastName) {
			name += ' ' + self.lastName;
		}
		return name;
	};
	
	/**
	 * Get string to use as table heading
	 */
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
	};
	
	self.formatCreated = function() {
		var date = self.created.getDate();
	    var month = self.created.getMonth() + 1; //Months are zero based
	    var year = self.created.getFullYear();
	    var hours = ('0' + self.created.getHours()).slice(-2);
	    var minutes = ('0' + self.created.getMinutes()).slice(-2);
	    return hours + ':' + minutes + ' ' + date + "/" + month + "/" + year 
	};
	
	self.getPlaceName = function() {
		if (self.hasAddress()) {
			var place = self.places[0];
			var output = [];
			if (place.street) {
				output.push(place.street);
			}
			if (place.city) {
				output.push(place.city);
			}
			if (place.zipcode) {
				output.push(place.zipcode);
			}
			return output.join(', ');
		} else if (self.hasCoords()) {
			return self.coords.latitude.toFixed(7) + ', ' + self.coords.longitude.toFixed(7);
		}
		return null;
	};
	
	self.hasCoords = function() {
		return (self.coords != null)
	};
	
	self.hasAddress = function() {
		return (self.places != null && self.places.length > 0);
	}
	
	return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = Contact;