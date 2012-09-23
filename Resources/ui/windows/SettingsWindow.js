function SettingsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Settings',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	var Settings = require('data/settings');
	
	var settingsTable = Ti.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	self.add(settingsTable);
	
	// Your name:
	
	var yourName = Ti.UI.createTableViewRow({
		header:'Your details',
		title: 'Your name',
	});
	settingsTable.appendRow(yourName);
	
	// Add text field to row
	var yourNameField = Ti.UI.createTextField({
		left: 140,
		width: 140,
		height: 45,
		color: '#0ba711',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		value: Settings.get('name')
	});
	yourName.add(yourNameField);
	
	// Make entire row focus text field
	yourName.addEventListener('click', function() {
		yourNameField.focus();
	});
	// Update settings on blur
	yourNameField.addEventListener('blur', function() {
		Settings.set('name', yourNameField.value);
	});
	
	// Your nubmer:
	
	var yourNumber = Ti.UI.createTableViewRow({
		title: 'Your number'
	});
	settingsTable.appendRow(yourNumber);
	
	// Add text field to row
	var yourNumberField = Ti.UI.createTextField({
		left: 140,
		width: 140,
		height: 45,
		color: '#0ba711',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		value: Settings.get('number'),
		keyboardType: Ti.UI.KEYBOARD_PHONE_PAD
	});
	yourNumber.add(yourNumberField);
	
	// Make entire row focus text field
	yourNumber.addEventListener('click', function() {
		yourNumberField.focus();
	});
	// Update settings on blur
	yourNumberField.addEventListener('blur', function() {
		Settings.set('number', yourNumberField.value);
	});
	
	// Facebook login / logout:
	
	var fbLogin = Ti.UI.createTableViewRow({
		header:'Social Media',
		selectedBackgroundColor: '#0ba711'
	});
	settingsTable.appendRow(fbLogin);
	
	// Callback to update text based on logged in state
	var setFbLoginState = function() {
		if (Ti.Facebook.loggedIn) {
			fbLogin.title = 'Disconnect from Facebook';
		} else {
			fbLogin.title = 'Connect to Facebook';
		}
	}
	
	// Add callbacks to events and call now
	Ti.Facebook.addEventListener('login', setFbLoginState);
	Ti.Facebook.addEventListener('logout', setFbLoginState);
	setFbLoginState();
	
	fbLogin.addEventListener('click', function(){
		if (Ti.Facebook.loggedIn) {
			Ti.Facebook.logout();
		} else {
			Ti.Facebook.authorize();
		}
	});
		
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = SettingsWindow;
