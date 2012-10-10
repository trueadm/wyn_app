"use strict";

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

  var self = Ti.UI.createWindow({
    title: 'My Number',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    rightNavButton: editButton
  });

  self.add(Ti.UI.iOS.createAdView({
    adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
    bottom: 0
  }));

  var detailsView = Ti.UI.createView({
    visible: false
  });
  self.add(detailsView);
  
  detailsView.add(Ti.UI.createView({
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: '#c00',
    borderRadius: 16,
    height: 100
  }));

  detailsView.add(Ti.UI.createView({
    top: 100,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    height: 20
  }));

  // 'Hello my name is' template

  detailsView.add(Ti.UI.createLabel({
    text: 'HELLO',
    textAlign: 'center',
    font: {fontSize: 52, fontWeight: 'bold'},
    color: 'white',
    top: 20
  }));
  detailsView.add(Ti.UI.createLabel({
    text: 'my name is',
    textAlign: 'center',
    font: {fontSize: 18},
    color: 'white',
    top: 73
  }));
  detailsView.add(Ti.UI.createLabel({
    text: 'and my number is',
    textAlign: 'center',
    font: {fontSize: 18},
    color: 'black',
    top: 185
  }));

  var nameLabel = Ti.UI.createLabel({
    font: {fontSize: 60, fontFamily: 'Rabiohead'},
    minimumFontSize: 10,
    textAlign: 'center',
    color: '#01215b',
    width: 280,
    height: 60,
    left: 20,
    top: 115
  });
  detailsView.add(nameLabel);

  var numberLabel = Ti.UI.createLabel({
    font: {fontSize: 60, fontFamily: 'Rabiohead'},
    textAlign: 'center',
    minimumFontSize: 10,
    color: '#01215b',
    width: 280,
    height: 60,
    left: 20,
    top: 220
  });
  detailsView.add(numberLabel);

  var defaultView = Ti.UI.createView({
    visible: false
  });
  self.add(defaultView);

  var titleLabel = Ti.UI.createLabel({
    text: 'Just a second...',
    font: {fontSize: 40, fontFamily: 'Rabiohead'},
    textAlign: 'center',
    width: 280,
    color: '#01215b',
    left: 20,
    top: 40
  });
  defaultView.add(titleLabel);

  var introLabel = Ti.UI.createLabel({
    text: 'Once you enter your details they’ll be displayed here',
    font: {fontSize: 18},
    textAlign: 'center',
    width: 280,
    left: 20,
    top: 105
  });
  defaultView.add(introLabel);

  var enterDetailsButton = Ti.UI.createButton({
    title: 'Enter details',
    style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    backgroundGradient: {
      type: 'linear',
      colors: ['#777', '#000001'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: 20},
      backfillEnd: true
    },
    height: 40,
    width: 150,
    top: 180
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
