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
		font:{fontSize:38, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#222',
		left: 20,
		top: 8,
	});
	self.add(numberLabel);
	
	//put a ref on this window of the numberLabel
	self.numberLabel = numberLabel;
	
	//Make the numpad
	var NumPadButton = require('ui/buttons/NumPadButton');
	self.numpad = [];
	var numPadButton, top = 65, left = 16;
	//go through 1-9 and make them in a grid, forget about 0 as that's special	
	for(var i = 0; i < 9; i++) {
		numPadButton = new NumPadButton(i + 1, left, top, self);
		self.add(numPadButton);
		//top += 50;
		if((i + 1) % 3 == 0) {
			top += 56;
			left = 16;
		} else {
			left += 97;
		}
	}
	//now put the + in
	numPadButton = new NumPadButton('+', 16, top, self);
	self.add(numPadButton);
		
	//now put the 0 in
	numPadButton = new NumPadButton(0, 16 + 97, top, self);
	self.add(numPadButton);
	
	//Add Backspace button, next to the 0
	var backspaceButton = Ti.UI.createButton({
		width: 95,
		height: 55,
		//title:L('Save'),
		top: top,
		left: 16 + 97 + 96,
		backgroundImage: 'images/bigback_button.png',
		backgroundSelectedImage: 'images/bigback_button_sel.png',
	});
	self.add(backspaceButton);		
	
	//Add Save button, but it at bottom of screen
	var saveButton = Ti.UI.createButton({
		height:55,
		width:288,
		//title:L('Save'),
		bottom: 12,
		backgroundImage: 'images/add_button.png',
	});
	self.add(saveButton);
	
	//we need to add the plus icon to the button to make it seem 'authentic' 
	//like the iPhone's numpad one is. we use a view for this.
	/* Removed as wasn't sure about it
	var buttonIconView = Ti.UI.createView({
		backgroundImage: 'images/button_add_icon.png',
		width: 17,
		height: 18,
		left: 18,
		top: 18,
	});
	saveButton.add(buttonIconView);
	*/
	
	//we use a label as we have better control over how it looks via the title of a button
	var buttonTextLabel = Ti.UI.createLabel({
		text: 'Save',
		font:{fontSize:22, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:0,y:2},
		shadowColor:'#16950d',
		color: '#fff',
		width: saveButton.width,
		zIndex: 2,
		height: saveButton.height - 5,
		touchEnabled: false,
	});
	saveButton.add(buttonTextLabel);
		
	
	//Listener for Save Button - don't use click. It's got a global timer built in
	backspaceButton.addEventListener('touchend', function() {
		if(numberLabel.text.length > 0) {
			//as we are adding a space in if its an 07 number, we need to check for it so we remove 2 last chars rather than 1
			numberLabel.text = numberLabel.text.substring(0, numberLabel.text.length - ((numberLabel.text.length === 6 &&
				numberLabel.text.substring(0,2) === '07') ? 2 : 1));
		}
	});	
	
	//Listener for Save Button
	saveButton.addEventListener('click', function() {
		var statusAlert;
		
		switch(numberLabel.text) {
			case '': {
				self.betterAlert('No number entered', 'Opps, you didn\'t enter a number!', 'My bad', 'I\'m a twat');
				
				break;
			}
			default: {
				//make new your details window
				var YourDetailsWindow = require('ui/windows/YourDetailsWindow');
				//open the window
				self.containingTab.open(new YourDetailsWindow(self));
				break;
			}
		}
	});	
	
	//pass the parent, this is to make deep-tree children window re-use code
	self.betterAlert = function(header, text, button1Text, button2Text) {
		self.parentWindow.betterAlert(header, text, button1Text, button2Text);
	};	
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = NewNumberWindow;
