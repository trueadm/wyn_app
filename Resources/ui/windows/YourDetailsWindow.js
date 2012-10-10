"use strict";

var Contact = require('model/Contact');

function YourDetailsWindow(parentWindow) {
  
  var bg = '/images/bg_lined.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_lined-568h.png';
  }

  var doneNavButton = Ti.UI.createButton({
    title: 'Done',
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  });
  
  var self = Ti.UI.createWindow({
    title: 'Your Details',
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab,
    backButtonTitle: 'Back',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    rightNavButton: doneNavButton
  });
  
  // Add fields

  self.add(Ti.UI.createLabel({
    text: 'NAME:',
    top: 33,
    left: 20,
    right: 20,
    font: {fontSize: 16, fontFamily: 'Baskerville'},
    color: 'black'
  }));
  
  var nameField = Ti.UI.createTextField({
    top: 60,
    left: 20,
    right: 20,
    height: 38,
    font: {fontSize: 38, fontFamily: 'Rabiohead'},
    minimumFontSize: 12,
    color: '#01215b'
  });
  self.add(nameField);
  
  var cameraButton = Ti.UI.createButton({
    title: 'Take a photo',
    top: 135,
    left: 20,
    height: 30,
    width: 100,
    color: '#444',
    font: {fontSize: 14},
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
  self.add(cameraButton);
  
  var clearPhotoButton = Ti.UI.createButton({
    top: 135,
    right: 20,
    height: 30,
    width: 100,
    title: 'Clear photo',
    visible: false,
    color: '#444',
    font: {fontSize: 14},
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
  self.add(clearPhotoButton);
  
  var photoContainer = Ti.UI.createView({
    top: 120,
    left: 20,
    width: 152,
    height: 152,
    visible: false,
    transform: Ti.UI.create2DMatrix({rotate: -10})
  });
  self.add(photoContainer);
  
  var shadow = Ti.UI.createView({
    width: 151,
    height: 151,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundColor: 'black'
  });
  photoContainer.add(shadow);
  
  var photoPreview = Ti.UI.createImageView({
    backgroundColor: 'white',
    width: 150,
    height: 150,
    top: 0,
    left: 0,
    borderWidth: 8,
    borderColor: 'white'
  });
  photoContainer.add(photoPreview);

  var doneButton = Ti.UI.createButton({
    top: 294,
    left: 20,
    height: 40,
    width: 280,
    title: 'Done',
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
      var ThankYouWindow = require('ui/windows/ThankYouWindow'),
        thankYouWindow = new ThankYouWindow(self, contact);
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

  doneNavButton.addEventListener('click', save);
  doneButton.addEventListener('click', save);

  return self;
}

module.exports = YourDetailsWindow;
