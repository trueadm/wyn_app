"use strict";

var _ = require('underscore')._,
  WYN = require('WYN');
  
function MyNumberWindow() {
  var Settings = require('data/Settings'),
    utils = require('PhoneNumberUtils'),
    SettingsWindow = require('ui/windows/SettingsWindow');

  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }

  var editButton = Ti.UI.createButton({
    title: 'Edit',
    style: Ti.UI.iPhone.SystemButtonStyle.BAR
  });

  var self = Ti.UI.createWindow(_.extend({
    title: 'My Number',
    backgroundImage: bg,
    rightNavButton: editButton
  }, WYN.styles.windowBar));

  if (Ti.Platform.osname === 'iphone') {
    self.add(Ti.UI.iOS.createAdView({
      adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
      bottom: 0
    }));
  }

  var detailsView = Ti.UI.createView({
    visible: false
  });
  self.add(detailsView);
  
  detailsView.add(Ti.UI.createView({
    top: '20dp',
    left: '10dp',
    right: '10dp',
    backgroundColor: '#c00',
    borderRadius: '16dp',
    height: '100dp'
  }));

  detailsView.add(Ti.UI.createView({
    top: '100dp',
    left: '10dp',
    right: '10dp',
    backgroundColor: 'white',
    height: '20dp'
  }));

  // 'Hello my name is' template

  detailsView.add(Ti.UI.createLabel({
    text: 'HELLO',
    textAlign: 'center',
    font: {fontSize: '52dp', fontWeight: 'bold'},
    color: 'white',
    top: '20dp'
  }));
  detailsView.add(Ti.UI.createLabel({
    text: 'my name is',
    textAlign: 'center',
    font: {fontSize: '18dp'},
    color: 'white',
    top: '73dp'
  }));
  detailsView.add(Ti.UI.createLabel({
    text: 'and my number is',
    textAlign: 'center',
    font: {fontSize: '18dp'},
    color: 'black',
    top: '185dp'
  }));

  var nameLabel = Ti.UI.createLabel({
    font: {fontSize: '60dp', fontFamily: 'Rabiohead'},
    minimumFontSize: '10dp',
    textAlign: 'center',
    color: '#01215b',
    height: '60dp',
    left: '20dp',
    right: '20dp',
    top: '115dp'
  });
  detailsView.add(nameLabel);

  var numberLabel = Ti.UI.createLabel({
    font: {fontSize: '60dp', fontFamily: 'Rabiohead'},
    textAlign: 'center',
    minimumFontSize: '10dp',
    color: '#01215b',
    height: '60dp',
    left: '20dp',
    right: '20dp',
    top: '220dp'
  });
  detailsView.add(numberLabel);

  var defaultView = Ti.UI.createView({
    visible: false
  });
  self.add(defaultView);

  var titleLabel = Ti.UI.createLabel({
    text: 'Just a second...',
    font: {fontSize: '40dp', fontFamily: 'Rabiohead'},
    textAlign: 'center',
    color: '#01215b',
    left: '20dp',
    right: '20dp',
    top: '40dp'
  });
  defaultView.add(titleLabel);

  var introLabel = Ti.UI.createLabel({
    text: 'Once you enter your details they’ll be displayed here',
    font: {fontSize: '18dp'},
    textAlign: 'center',
    width: '280',
    left: '20dp',
    right: '20dp',
    top: '105dp'
  });
  defaultView.add(introLabel);

  var enterDetailsButton = Ti.UI.createButton({
    title: 'Enter details',
    style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    borderRadius: '5dp',
    borderColor: 'black',
    borderWidth: '2dp',
    backgroundGradient: {
      type: 'linear',
      colors: ['#777', '#000001'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: '20dp'},
      backfillEnd: true
    },
    height: '40dp',
    width: '150dp',
    top: '180dp'
  });
  defaultView.add(enterDetailsButton);

  var settingsWindow = new SettingsWindow(self);
  var openSettings = function () {
    self.containingTab.open(settingsWindow);
  };

  editButton.addEventListener('click', openSettings);
  enterDetailsButton.addEventListener('click', openSettings);

  var update = function () {
    var name = Settings.get('name'),
      number = Settings.get('number');
    if (name && number) {
      defaultView.hide();
      detailsView.show();
      nameLabel.text = Settings.get('name');
      numberLabel.text = utils.formatNumber(Settings.get('number'));
    } else {
      defaultView.show();
      detailsView.hide();
    }
  };

  Ti.App.addEventListener('settings:change', update);
  update();

  return self;
}

module.exports = MyNumberWindow;
