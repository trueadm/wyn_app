"use strict";

function NumPadButton(buttonNumber, buttonLeft, buttonTop) {
  var self = Ti.UI.createButton({
    width: '90dp',
    height: '65dp',
    top: buttonTop + 'dp',
    left: buttonLeft + 'dp',
    backgroundImage: '/images/phone_key.png',
    backgroundSelectedImage: '/images/phone_key_down.png'
  });
  
  var labelOptions = {
    text: buttonNumber.toString(),
    font: {fontSize: '36dp',  fontFamily: 'CODE Bold'},
    textAlign: 'center',
    color: '#303030',
    width: self.width,
    zIndex: 2,
    height: self.height,
    top: '-5dp',
    left: '1dp',
    touchEnabled: false
  };
  
  // add the number label
  var buttonTextLabel = Ti.UI.createLabel(labelOptions);
  self.add(buttonTextLabel);

  // add the number label for down state
  // Simply moving to label lags and isn't in sync with the button bg
  labelOptions.top = '-2dp';
  labelOptions.visible = false;
  var buttonTextLabelDown = Ti.UI.createLabel(labelOptions);
  self.add(buttonTextLabelDown);
  
  self.addEventListener('touchstart', function () {
    buttonTextLabel.hide();
    buttonTextLabelDown.show();
  });
  self.addEventListener('touchend', function () {
    buttonTextLabelDown.hide();
    buttonTextLabel.show();
  });
  
  self.number = buttonNumber;
  
  return self;
}

module.exports = NumPadButton;
