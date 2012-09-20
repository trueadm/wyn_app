function YourDetailsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Your Details',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		backButtonTitle: 'Back',
		barColor: '#0ba711',
	});
	
	//add in a first name container view
	var firstNameView = Ti.UI.createView({
		top: 20,
		left: 20,
		width: 280,
		height: 55,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#999',
		backgroundColor: '#fff',		
	});
	self.add(firstNameView);
	
	//add first name text field
	var firstNameField = Ti.UI.createTextField({
		top: 0,
		hintText: 'First name',
		left: 15,
		width: 280,
		height: 55,
		font:{fontSize:24, fontFamily:'Helvetica Neue'},
	});
	firstNameView.add(firstNameField);
	
	//add in a last name container view
	var lastNameView = Ti.UI.createView({
		top: 85,
		left: 20,
		width: 280,
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#999',
		backgroundColor: '#fff',		
	});
	self.add(lastNameView);
	
	//add first name text field
	var lastNameField = Ti.UI.createTextField({
		top: 0,
		hintText: 'Last name (optional)',
		left: 15,
		width: 280,
		height: 40,
		font:{fontSize:18, fontFamily:'Helvetica Neue'},
	});
	lastNameView.add(lastNameField);	
	
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = YourDetailsWindow;
