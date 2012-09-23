function MyNumberWindow(parentWindow) {
	

	var self = Ti.UI.createWindow({
		title:'My Number',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	//add buttons to title bar so we can switch templates of this page
	var previousButton = Ti.UI.createButton({
	    title: 'Prev'
	});
	self.leftNavButton = previousButton;
	
	var nextButton = Ti.UI.createButton({
	    title: 'Next'
	});	
	self.rightNavButton = nextButton;
	
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
	
	var line = Titanium.UI.createView({
	    width: "100%",
	    height: 1,
	    top: 135,
	    left: 25,
	    width: 270,
	    borderWidth: 1,
	    borderColor: "#bbb",
	});	
	scrollView.add(line);	
	
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
	
	var line = Titanium.UI.createView({
	    width: "100%",
	    height: 1,
	    top: 210,
	    left: 25,
	    width: 270,
	    borderWidth: 1,
	    borderColor: "#bbb",
	});	
	scrollView.add(line);
	
	var lookBelowLabel = Ti.UI.createLabel({
		text: 'Hint: Look Below',
		font:{fontSize:16, fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#999',
		left: 20,
		top: 335,
	});
	scrollView.add(lookBelowLabel);		
	
	var leadUpLabel = Ti.UI.createLabel({
		text: 'Right, now you have mine...',
		font:{fontSize:20, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:1,y:1},
		shadowColor:'#fff',
		width: 280,
		color: '#444',
		left: 20,
		top: 380,
	});
	scrollView.add(leadUpLabel);	
	
	var whatsYourNumberButton = Ti.UI.createButton({
		height:55,
		width:288,
		//title:L('Save'),
		top: 420,
		bottom: 30,
		backgroundImage: 'images/add_button.png',
	});
	scrollView.add(whatsYourNumberButton);
	
	//we use a label as we have better control over how it looks via the title of a button
	var buttonTextLabel = Ti.UI.createLabel({
		text: 'What\s your number?',
		font:{fontSize:22, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:0,y:2},
		shadowColor:'#16950d',
		color: '#fff',
		width: whatsYourNumberButton.width,
		zIndex: 2,
		height: whatsYourNumberButton.height - 5,
		touchEnabled: false,
	});
	whatsYourNumberButton.add(buttonTextLabel);
	
	var Settings = require('data/Settings');
	
	var setText = function() {
		utils = require('PhoneNumberUtils');
		myNameLabel.text = 'My name is '  + Settings.get('name') + ' and my number is';
		numberLabel.text = utils.formatNumber(Settings.get('number'));
	}
	
	self.addEventListener('focus', setText);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = MyNumberWindow;
