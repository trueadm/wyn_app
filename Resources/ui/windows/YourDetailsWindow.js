"use strict";

var _ = require('underscore')._,
  WYN = require('WYN'),
  Contact = require('model/Contact'),
  ThankYouWindow = require('/ui/windows/ThankYouWindow');

function YourDetailsWindow(parentWindow) {
  
  var bg = '/images/bg_lined.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_lined-568h.png';
  }
  
  var self = Ti.UI.createWindow(_.extend({
    title: 'Your Details',
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab,
    backButtonTitle: 'Back',
    backgroundImage: bg
  }, WYN.styles.windowBar));
  
  if (WYN.osname === 'iphone') {
    var doneNavButton = Ti.UI.createButton({
      title: 'Done',
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    self.rightNavButton = doneNavButton;  
  }
  
  // Add fields

  self.add(Ti.UI.createLabel({
    text: 'NAME:',
    top: '33dp',
    left: '20dp',
    right: '20dp',
    font: {fontSize: '16dp', fontFamily: 'Baskerville'},
    color: 'black'
  }));
  
  var nameField = Ti.UI.createTextField({
    top: '60dp',
    left: '20dp',
    right: '20dp',
    height: '38dp',
    font: {fontSize: '38dp', fontFamily: 'Rabiohead'},
    minimumFontSize: '12dp',
    color: '#01215b'
  });
  self.add(nameField);
  
  var cameraButton = Ti.UI.createButton(_.extend({
    title: 'Take a photo',
    top: '135dp',
    left: '20dp',
    width: '100dp',
  }, WYN.styles.buttonSmall));
  self.add(cameraButton);
  
  var clearPhotoButton = Ti.UI.createButton(_.extend({
    top: '135dp',
    right: '20dp',
    width: '100dp',
    title: 'Clear photo',
    visible: false,
  }, WYN.styles.buttonSmall));
  self.add(clearPhotoButton);
  
  var photoContainer = Ti.UI.createView({
    top: '120dp',
    left: '20dp',
    width: '152dp',
    height: '152dp',
    visible: false,
    transform: Ti.UI.create2DMatrix({rotate: -10})
  });
  self.add(photoContainer);
  
  var shadow = Ti.UI.createView({
    width: '151dp',
    height: '151dp',
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundColor: 'black'
  });
  photoContainer.add(shadow);
  
  var photoPreview = Ti.UI.createImageView({
    backgroundColor: 'white',
    width: '150dp',
    height: '150dp',
    top: 0,
    left: 0,
    borderWidth: '8dp',
    borderColor: 'white'
  });
  photoContainer.add(photoPreview);

  var doneButton = Ti.UI.createButton(_.extend({
    bottom: '20dp',
    left: '20dp',
    right: '20dp',
    title: 'Done'
  }, WYN.styles.buttonPrimary));
  self.add(doneButton);

  // Events / callbacks
  
  // Focus name field on load
  self.addEventListener('open', function () {
    nameField.focus();
  });
  
  // Photo upload callbacks
  
  function setPhoto(photo) {
    self.photo = photo;
    cameraButton.hide();
    photoContainer.show();
    clearPhotoButton.show();
    photoPreview.setImage(photo);
  }
  
  function clearPhoto() {
    self.photo = null;
    cameraButton.show();
    photoContainer.hide();
    clearPhotoButton.hide();
  }
  
  cameraButton.addEventListener('click', function () {
    nameField.blur();
    Ti.Media.showCamera({
      mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
      success: function (event) {
        setPhoto(event.media);
      },
      error: function (error) {
        var a = Ti.UI.createAlertDialog({title: 'Camera'});
        if (error.code === Ti.Media.NO_CAMERA) {
          setPhoto(Titanium.Filesystem.getFile('images/test_photo.jpg').read());
        } else {
          a.setMessage('Unexpected error: ' + error.code);
        }
      }
    });
  });
  
  clearPhotoButton.addEventListener('click', clearPhoto);
  
  // Submit callback
  
  function save() {
    var contact = new Contact();
    contact.setName(nameField.value);
    contact.phone = parentWindow.phoneNumber;
    if (self.photo) {
      contact.photo = self.photo;
    }
      
    if (contact.isValid()) {      
      contact.save();

      // Show thank you window
      var thankYouWindow = new ThankYouWindow(self, contact);
      self.containingTab.open(thankYouWindow);

    } else {
      var statusAlert = Titanium.UI.createAlertDialog({
        title: 'Oops!',
        message: contact.getMessages()[0]
      });
      statusAlert.addEventListener('click', function () {
        nameField.focus();
      });
      statusAlert.show();
    }
  }

  if (WYN.osname === 'iphone') {
    doneNavButton.addEventListener('click', save);
  }
  doneButton.addEventListener('click', save);

  return self;
}

module.exports = YourDetailsWindow;
