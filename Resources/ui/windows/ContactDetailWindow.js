"use strict";

var _ = require('underscore')._,
  WYN = require('WYN'),
  ContactMapWindow = require('/ui/windows/ContactMapWindow');

function ContactDetailWindow(parentWindow, contact) {
  var self = Ti.UI.createWindow(_.extend({
    title: 'Info',
    backgroundColor: 'white',
    backgroundImage: '/images/bg_white.png',
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab
  }, WYN.styles.windowBar));
  
  var data = [
  ];
  
  if (contact.image) {
    var photoRow = Ti.UI.createTableViewRow();
    var image = Ti.UI.createImageView({
      left: 0,
      width: '100dp',
      height: '100dp'
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
    top: '10dp',
    bottom: '49dp',
    data: data
  });
  self.add(table);
  
  return self;
}

module.exports = ContactDetailWindow;
