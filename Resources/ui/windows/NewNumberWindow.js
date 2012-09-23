function NewNumberWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Enter your number',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	//add a label that will display the number
	var numberLabel = Ti.UI.createLabel({
		text: '',
		font:{fontSize:32, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#222',
		left: 20,
		top: 8,
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
		top = 65,
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
			top += 56;
			left = 16;
		} else {
			left += 97;
		}
	}
	//now put the + in
	// numPadButton = new NumPadButton('+', 16, top, self);
	// self.add(numPadButton);
		
	//now put the 0 in
	numPadButton = new NumPadButton(0, 16 + 97, top, self);
	numPadButton.addEventListener('touchend', function(e) {
		appendDigit(0);
	});
	self.add(numPadButton);
	
	//Add Backspace button, next to the 0
	var backspaceButton = Ti.UI.createButton({
		width: 95,
		height: 55,
		top: top,
		left: 16 + 97 + 96,
		backgroundImage: 'images/bigback_button.png',
		backgroundSelectedImage: 'images/bigback_button_sel.png',
	});
	backspaceButton.addEventListener('touchend', removeDigit);
	backspaceButton.addEventListener('longpress', self.clear);
	self.add(backspaceButton);		
	
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
			self.YourDetailsWindow.containingTab = self.containingTab;
			self.containingTab.open(self.YourDetailsWindow);			
		}
	});
	
	return self;
};

module.exports = NewNumberWindow;