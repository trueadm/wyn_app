"use strict";

var Settings = require('data/Settings');

function SettingsWindow(parentWindow) {
  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }
  
  var self = Ti.UI.createWindow({
    title: 'Settings',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    parentWindow: parentWindow
  });

  self.add(Ti.UI.iOS.createAdView({
    adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
    bottom: 0
  }));
  
  var settingsTable = Ti.UI.createTableView({top: 10, bottom: 50});
  self.add(settingsTable);
  
  // Your name:
  
  var yourName = Ti.UI.createTableViewRow({
    header: 'Your details',
    title: 'Your name'
  });
  settingsTable.appendRow(yourName);
  
  // Add text field to row
  var yourNameField = Ti.UI.createTextField({
    left: 150,
    width: 160,
    height: 45,
    minimumFontSize: 9,
    color: '#999999',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
    value: Settings.get('name')
  });
  yourName.add(yourNameField);
  
  // Make entire row focus text field
  yourName.addEventListener('click', function () {
    yourNameField.focus();
  });
  // Update settings on blur
  yourNameField.addEventListener('blur', function () {
    Settings.set('name', yourNameField.value);
  });
  
  // Your number:
  
  var yourNumber = Ti.UI.createTableViewRow({
    title: 'Your number'
  });
  settingsTable.appendRow(yourNumber);
  
  // Add text field to row
  var yourNumberField = Ti.UI.createTextField({
    left: 150,
    width: 160,
    height: 45,
    color: '#999999',
    minimumFontSize: 9,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
    value: Settings.get('number'),
    keyboardType: Ti.UI.KEYBOARD_PHONE_PAD
  });
  yourNumber.add(yourNumberField);
  
  // Make entire row focus text field
  yourNumber.addEventListener('click', function () {
    yourNumberField.focus();
  });
  // Update settings on blur
  yourNumberField.addEventListener('blur', function () {
    Settings.set('number', yourNumberField.value);
  });
  
  return self;
}

module.exports = SettingsWindow;
