function MyNumberWindow() {
	
	var self = Ti.UI.createWindow({
		title:'My Number',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
	});
	
	var scrollView = Titanium.UI.createScrollView({
	    contentHeight:'auto',
	});		
	self.add(scrollView);
	
	var heyLabel = Ti.UI.createLabel({
		text: 'Hey there!',
		font:{fontSize:26, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#444',
		left: 20,
		top: 20,
	});
	scrollView.add(heyLabel);	
	
	var myNameLabel = Ti.UI.createLabel({
		text: 'My name is Billy and my number is',
		font:{fontSize:20, fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#444',
		left: 20,
		top: 65,
	});
	scrollView.add(myNameLabel);		
	
	var numberLabel = Ti.UI.createLabel({
		font:{fontSize:38, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#222',
		left: 20,
		top: 147,
	});
	scrollView.add(numberLabel);		
	
	var Settings = require('data/Settings');
	
	var setText = function() {
		utils = require('PhoneNumberUtils');
		myNameLabel.text = 'My name is '  + Settings.get('name') + ' and my number is';
		numberLabel.text = utils.formatNumber(Settings.get('number'));
	}
	
	self.addEventListener('focus', setText);
	
	return self;
};

module.exports = MyNumberWindow;