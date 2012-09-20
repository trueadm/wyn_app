function NumPadButton(buttonNumber, buttonLeft, buttonTop, parentWindow) {
	var self = Ti.UI.createButton({
		width: 95,
		height: 55,
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		top: buttonTop,
		left: buttonLeft,
		backgroundImage: 'images/keypad_button.png',
		backgroundSelectedImage: 'images/keypad_button_sel.png',
	});
	
	//add the number label
	var buttonTextLabel = Ti.UI.createLabel({
		text: buttonNumber.toString(),
		font:{fontSize:28,  fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:0,y:1},
		shadowColor:'#fff',
		color: '#444',
		width: self.width,
		zIndex: 2,
		height: self.height, 
		top: ((buttonNumber.toString() === '+') ? -3 : 0), //otherwise the plus goes down too far
		touchEnabled: false,
	});
	self.add(buttonTextLabel);
	
	//Listener for numpad Button
	self.addEventListener('touchend', function(e) {
		//this may look strange, basically we need to know the limit based on what type of number they're inputting
		//07 numbers are 11 chracters long (+1 for space char), but we can't tell this till we have the first 2 characters
		if(parentWindow.numberLabel.text.length < 3  ||
			(parentWindow.numberLabel.text.length < 13 && parentWindow.numberLabel.text.substring(0,2) !== '07')
			|| (parentWindow.numberLabel.text.substring(0,2) === '07' && parentWindow.numberLabel.text.length < 12)) {
				
			parentWindow.numberLabel.text = e.source.parentWindow.numberLabel.text + buttonNumber +
			//add a space in between
			((parentWindow.numberLabel.text.length === 4 && parentWindow.numberLabel.text.substring(0,2) === '07') ? ' ' : '');
		}
	});
	
	return self;
}

module.exports = NumPadButton;