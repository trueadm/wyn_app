"use strict";

function ThankYouWindow(parentWindow, contact) {
  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }
  
  var self = Ti.UI.createWindow({
    title: 'Thank You!',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab,
    // Empty view to remove back button
    leftNavButton: Ti.UI.createView({})
  });

  self.add(Ti.UI.iOS.createAdView({
    adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
    bottom: 0
  }));

  var message = Ti.UI.createLabel({
    text: contact.firstName + '’s number was saved',
    top: 40,
    left: 20,
    right: 20,
    textAlign: 'center'
  });
  self.add(message);
  
  var newButton = Ti.UI.createButton({
    top: 80,
    title: 'Add another number',
    width: 200,
    height: 40,
    color: 'white',
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
    }
  });
  self.add(newButton);
  
  newButton.addEventListener('click', function () {
    self.close();
    self.parentWindow.close();
    self.parentWindow.parentWindow.clear();
  });
  
  var callButton = Ti.UI.createButton({
    top: 130,
    title: 'Call number',
    width: 130,
    height: 40,
    color: '#444',
    style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundGradient: {
      type: 'linear',
      colors: ['#eee', '#ccc'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: 20},
      backfillEnd: true
    }
  });
  self.add(callButton);
  
  callButton.addEventListener('click', function () {
    Ti.Platform.openURL('tel: ' + contact.phone);
  });
  
  if (contact.getPhoneType() === 'mobile') {
    var textButton = Ti.UI.createButton({
      top: 180,
      title: 'Text number',
      height: 40,
      width: 130,
      color: '#444',
      style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 2,
      backgroundGradient: {
        type: 'linear',
        colors: ['#eee', '#ccc'],
        startPoint: {x: 0, y: 0},
        endPoint: {x: 0, y: 20},
        backfillEnd: true
      }
    });
    self.add(textButton);
    
    textButton.addEventListener('click', function () {
      // var sms = require('bencoding.SMS').createSMSDialog({
            // barColor: 'black', //set the SMS Dialog barColor
            // messageBody:"Appcelerator Titanium Rocks!", //Set SMS Message
            // toRecipients:[contact.phone.mobile] //Who we are the SMS sending to
      // });
      Ti.Platform.openURL('sms: ' + contact.phone.mobile);
    });
  }
  
  return self;
}

module.exports = ThankYouWindow;
