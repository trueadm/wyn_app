"use strict";

var _ = require('underscore')._,
  WYN = require('WYN'),
  Settings = require('data/Settings');

function SettingsWindow(parentWindow) {
  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }
  
  var self = Ti.UI.createWindow(_.extend({
    title: 'Settings',
    backgroundImage: bg,
    parentWindow: parentWindow
  }, WYN.styles.windowBar));

  var bottom = 0;
  if (WYN.osname === 'iphone') {
    self.add(Ti.UI.iOS.createAdView({
      adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
      bottom: 0
    }));
    bottom = '50dp';
  }
  
  var settingsTable = Ti.UI.createTableView({top: '10dp', bottom: bottom});
  self.add(settingsTable);
  
  // Your name:
  
  var yourName = Ti.UI.createTableViewRow({
    header: 'Your details',
    title: 'Your name'
  });
  settingsTable.appendRow(yourName);
  
  // Add text field to row
  var yourNameField = Ti.UI.createTextField({
    left: '150dp',
    width: '160dp',
    height: '45dp',
    minimumFontSize: '9dp',
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
    left: '150dp',
    width: '160dp',
    height: '45dp',
    color: '#999999',
    minimumFontSize: '9dp',
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
    // Todo: validate
    Settings.set('number', yourNumberField.value);
  });
  
  return self;
}

module.exports = SettingsWindow;
