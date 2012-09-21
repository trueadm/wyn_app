function LocalStorage() {
	
	var self = [];
	
	self.myFirstName = JSON.parse(Ti.App.Properties.getString("my_first_name"));
	self.myLastName = JSON.parse(Ti.App.Properties.getString("my_last_name"));
	self.myNumber = JSON.parse(Ti.App.Properties.getString("my_number"));
	
	//use this for the list tab
	self.numbersList = JSON.parse(Ti.App.Properties.getString("numbers_list"));
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = LocalStorage;
