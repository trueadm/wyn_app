function WelcomeWindow(tabGroup) {
	var self = Ti.UI.createWindow({
		title: 'Welcome',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
		tabBarHidden: true
	});
	
	var Settings = require('data/Settings');
	
	var yourNameField = Ti.UI.createTextField({
		top: 20,
		value: Settings.get('name'),
		hintText: 'Your name',
	});
	self.add(yourNameField);
	
	yourNameField.addEventListener('blur', function() {
		Settings.set('name', yourNameField.value);
	});
	
	var yourNumberField = Ti.UI.createTextField({
		top: 60,
		value: Settings.get('number'),
		keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
		hintText: 'Your phone number',
	});
	self.add(yourNumberField);
	
	yourNumberField.addEventListener('blur', function() {
		Settings.set('number', yourNumberField.value);
	});
	
		//Add Save button, but it at bottom of screen
	var saveButton = Ti.UI.createButton({
		height:55,
		width:288,
		bottom: 12,
		backgroundImage: 'images/add_button.png',
	});
	self.add(saveButton);
	
	//we use a label as we have better control over how it looks via the title of a button
	var buttonTextLabel = Ti.UI.createLabel({
		text: 'Done',
		font: {fontSize:22, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign: 'center',
		shadowOffset :{x:0,y:2},
		shadowColor: '#16950d',
		color: '#fff',
		width: saveButton.width,
		zIndex: 2,
		height: saveButton.height - 5,
		touchEnabled: false,
	});
	saveButton.add(buttonTextLabel);
	
	saveButton.addEventListener('click', function () {
		tabGroup.showMainTabs();
	});
	
	return self;
};

module.exports = WelcomeWindow;