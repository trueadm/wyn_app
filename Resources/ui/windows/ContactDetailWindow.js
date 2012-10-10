"use strict";

function ContactDetailWindow(parentWindow, contact) {
  var self = Ti.UI.createWindow({
    title: 'Info',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: 'images/bg_white.png',
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab
  });
  
  var data = [
  ];
  
  if (contact.image) {
    var photoRow = Ti.UI.createTableViewRow();
    var image = Ti.UI.createImageView({
      left: 0,
      width: 100,
      height: 100
    });
    photoRow.add(image);
    data.push(photoRow);
    image.setImage(contact.image);
  }
  
  data.push({title: contact.getName()});
  data.push({title: contact.formatNumber()});
  
  data.push({header: 'Added', title: contact.formatCreated()});
  
  if (contact.hasCoords()) {
    var showMap = Ti.UI.createTableViewRow({
      'title': contact.getPlaceName(),
      'hasDetail': true
    });
    data.push(showMap);
    
    showMap.addEventListener('click', function () {
      var ContactMapWindow = require('ui/windows/ContactMapWindow');
      self.containingTab.open(new ContactMapWindow(self, contact));
    });  
  }
  
  var call = Titanium.UI.createButton({
    title: 'Call',
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  });
  var buttons = [call];
  call.addEventListener('click', function () {
    Ti.Platform.openURL('tel:' + contact.phone);
  });
  
  if (contact.getPhoneType() === 'mobile') {
    var text = Ti.UI.createButton({
      title: 'Text',
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    buttons.push(text);
    
    text.addEventListener('click', function () {
      /*
      var sms = require('bencoding.sms').createSMSDialog({
            barColor:'black', //set the SMS Dialog barColor
            messageBody:"Appcelerator Titanium Rocks!", //Set SMS Message
            toRecipients:[contact.phone.mobile] //Who we are the SMS sending to
      });
      */
      Ti.Platform.openURL('sms:' + contact.phone);
    });
  }
  
  var toolbar = Titanium.UI.iOS.createToolbar({
    items: buttons,
    bottom: 0,
    borderTop: true,
    borderBottom: false
  });
  self.add(toolbar);
  
  var table = Ti.UI.createTableView({
    top: 10,
    bottom: 49,
    data: data
  });
  self.add(table);
  
  return self;
}

module.exports = ContactDetailWindow;
