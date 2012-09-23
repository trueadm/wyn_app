function NumPadButton(buttonNumber, buttonLeft, buttonTop) {
	var self = Ti.UI.createButton({
		width: 95,
		height: 55,
		backgroundColor:'#eee',
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
	
	self.number = buttonNumber;
	
	return self;
}

module.exports = NumPadButton;