function NewNumberWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'What’s your number?',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundImage: 'images/numpad_bg.png',
		parentWindow: parentWindow,
	});
	
	/*
	var ad = Ti.UI.iOS.createAdView({
		adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
		top: 0,
		left: 0,
		width: 'auto',
		height: 'auto'
	});
	self.add(ad);
	*/
	
	//add a label that will display the number
	var numberLabel = Ti.UI.createLabel({
		text: '',
		font:{fontSize:46, fontWeight: 'bold', fontFamily:'Rabiohead'},
		textAlign:'center',
		width: 300,
		color: '#01215b',
		left: 10,
		top: 15,
	});
	self.add(numberLabel);
	
	// Unformatted number string
	self.phoneNumber = '';
	
	var utils = require('PhoneNumberUtils');
	
	var appendDigit = function (digit) {
		digit = String(digit);
		if (!utils.tooLong(self.phoneNumber + digit)) {
			self.phoneNumber += digit;
			numberLabel.text = utils.formatNumber(self.phoneNumber);
		}
	};
	
	var removeDigit = function () {
		if(numberLabel.text.length > 0) {
			self.phoneNumber = self.phoneNumber.substring(0, self.phoneNumber.length - 1);
			numberLabel.text = utils.formatNumber(self.phoneNumber);
		}
	}
	
	var clear = function() {
		self.phoneNumber = '';
		numberLabel.text = '';
	}
	self.clear = clear;
	
	//Make the numpad
	var NumPadButton = require('ui/buttons/NumPadButton'),
		numPadButton,
		top = 95,
		left = 16;
	
	//go through 1-9 and make them in a grid, forget about 0 as that's special	
	for (var i = 0; i < 9; i++) {
		numPadButton = new NumPadButton(i + 1, left, top);
		numPadButton.addEventListener('touchend', function(e) {
			appendDigit(e.source.number);
		});
		self.add(numPadButton);
		//top += 50;
		if ((i + 1) % 3 === 0) {
			top += 63;
			left = 16;
		} else {
			left += 100;
		}
	}
	//now put the + in
	// numPadButton = new NumPadButton('+', 16, top, self);
	// self.add(numPadButton);
		
	//now put the 0 in
	numPadButton = new NumPadButton(0, 116, top, self);
	numPadButton.addEventListener('touchend', function(e) {
		appendDigit(0);
	});
	self.add(numPadButton);
	
	//Add Backspace button, next to the 0
	var backspaceButton = Ti.UI.createButton({
		width: 91,
		height: 66,
		top: top,
		left: 16,
		backgroundImage: 'images/phone_key_backspace.png',
		backgroundSelectedImage: 'images/phone_key_backspace_down.png',
	});
	backspaceButton.addEventListener('touchend', removeDigit);
	backspaceButton.addEventListener('longpress', self.clear);
	self.add(backspaceButton);		
	
	//Add Save button, but it at bottom of screen
	var saveButton = Ti.UI.createButton({
		width: 91,
		height: 66,
		top: top,
		left: 216,
		backgroundImage: 'images/phone_key_submit.png',
		backgroundSelectedImage: 'images/phone_key_submit_down.png',
	});
	self.add(saveButton);
	
	//Listener for Save Button
	saveButton.addEventListener('click', function() {
		var error;
		
		// Validate
		if (!self.phoneNumber) {
			error = 'You didn\'t enter a number';
		} else if (self.phoneNumber.length < 10) {
			error = 'That number looks too short';
		}
		
		if (error) {
			var statusAlert = Titanium.UI.createAlertDialog({
				title: 'Oops!',
				message: error
			});
			statusAlert.show();
			
		} else {
			var YourDetailsWindow = require('ui/windows/YourDetailsWindow');
			//open the window
			self.YourDetailsWindow = new YourDetailsWindow(self);
			self.containingTab.open(self.YourDetailsWindow);			
		}
	});
	
	return self;
};

module.exports = NewNumberWindow;