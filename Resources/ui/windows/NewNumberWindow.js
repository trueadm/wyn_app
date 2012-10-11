"use strict";

var _ = require('underscore')._,
  WYN = require('WYN'),
  NumPadButton = require('/ui/buttons/NumPadButton'),
  utils = require('/PhoneNumberUtils'),
  YourDetailsWindow = require('/ui/windows/YourDetailsWindow');

function NewNumberWindow(parentWindow) {
  var bg = '/images/bg_numpad.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_numpad-568h.png';
  }
  
  var self = Ti.UI.createWindow(_.extend({
    title: 'What’s your number?',
    backgroundImage: bg,
    parentWindow: parentWindow
  }, WYN.styles.windowBar));
  
  //add a label that will display the number
  var numberLabel = Ti.UI.createLabel({
    text: '',
    font: {fontSize: '50dp', fontWeight: 'bold', fontFamily: 'Rabiohead'},
    minimumFontSize: '12dp',
    textAlign: 'center',
    height: '50dp',
    color: '#01215b',
    left: '15dp',
    right: '15dp',
    top: '20dp'
  });
  self.add(numberLabel);
  
  // Unformatted number string
  self.phoneNumber = '';
  
  var appendDigit = function (digit) {
    digit = String(digit);
    var formatted = utils.formatNumber(self.phoneNumber + digit);

    if (formatted !== null) {
      self.phoneNumber += digit;
      numberLabel.text = formatted;
    } else {
      var statusAlert = Titanium.UI.createAlertDialog({
        title: 'Oops!',
        message: 'That number doesn’t look right. Please check it and try again.'
      });
      statusAlert.show();
    }
  };
  
  var removeDigit = function () {
    if (numberLabel.text.length > 0) {
      self.phoneNumber = self.phoneNumber.substring(0, self.phoneNumber.length - 1);
      numberLabel.text = utils.formatNumber(self.phoneNumber);
    }
  };
  
  var clear = function () {
    self.phoneNumber = '';
    numberLabel.text = '';
  };
  self.clear = clear;
  
  self.addEventListener('focus', clear);
  
  //Make the numpad
  var numPadButton,
    top = 95,
    left = 16,
    leftMargin = 16,
    rowHeight = 63,
    colWidth = 100;
    
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    top += 30;
    rowHeight += 7;
  }
  
  //go through 1-9 and make them in a grid, forget about 0 as that's special  
  for (var i = 0; i < 9; i++) {
    numPadButton = new NumPadButton(i + 1, left, top);
    numPadButton.sound = Ti.Media.createSound({url: '/sounds/' + (i + 1) + '.wav'});
    numPadButton.addEventListener('touchend', function (e) {
      appendDigit(e.source.number);
      e.source.sound.play();
    });
    self.add(numPadButton);
    
    if ((i + 1) % 3 === 0) {
      top += rowHeight;
      left = leftMargin;
    } else {
      left += colWidth;
    }
  }
  
  //now put the 0 in
  numPadButton = new NumPadButton(0, leftMargin + colWidth, top, self);
  numPadButton.sound = Ti.Media.createSound({url: '/sounds/0.wav'});
  numPadButton.addEventListener('touchend', function (e) {
    appendDigit(0);
    numPadButton.sound.play();
  });
  self.add(numPadButton);
  
  //Add Backspace button, next to the 0
  var backspaceButton = Ti.UI.createButton({
    width: '91dp',
    height: '66dp',
    top: top + 'dp',
    left: leftMargin + colWidth * 2 + 'dp',
    backgroundImage: '/images/phone_key_backspace.png',
    backgroundSelectedImage: '/images/phone_key_backspace_down.png',
  });
  var click = Ti.Media.createSound({url: '/sounds/click.mp3'});
  backspaceButton.addEventListener('touchend', function () {
    removeDigit();
    click.play();
  });
  backspaceButton.addEventListener('longpress', self.clear);
  self.add(backspaceButton);    
  
  //Add Save button, but it at bottom of screen
  var saveButton = Ti.UI.createButton({
    width: '91dp',
    height: '66dp',
    top: top + 'dp',
    left: leftMargin + 'dp',
    backgroundImage: '/images/phone_key_submit.png',
    backgroundSelectedImage: '/images/phone_key_submit_down.png',
  });
  self.add(saveButton);
  
  // Listener for Save Button
  saveButton.addEventListener('click', function() {
    // Play click sound effect
    click.play();

    // Validate

    var error;

    if (!self.phoneNumber) {
      error = 'You didn’t enter a number!';
    } else if (!utils.isValid(self.phoneNumber)) {
      // We already know the number is a valid partial number, so it 
      // must be incomplete
      error = 'That number looks too short';
    }
    
    if (error) {
      var statusAlert = Titanium.UI.createAlertDialog({
        title: 'Oops!',
        message: error
      });
      statusAlert.show();
      
    } else {
      //open the window
      self.YourDetailsWindow = new YourDetailsWindow(self);
      self.containingTab.open(self.YourDetailsWindow);      
    }
  });
  
  return self;
};

module.exports = NewNumberWindow;
