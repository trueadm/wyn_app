"use strict";

function ContactMapWindow(parentWindow, contact) {
  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }
  
  var self = Ti.UI.createWindow({
    title: 'Added here',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    parentWindow: parentWindow,
    containingTab: parentWindow.containingTab
  });
  
  var addedLocation = Titanium.Map.createAnnotation({
    latitude: contact.coords.latitude,
    longitude: contact.coords.longitude,
    title: contact.getPlaceName(),
    subtitle: contact.formatCreated(),
    pincolor: Titanium.Map.ANNOTATION_RED,
    animate: true
  });
  
  var map = Ti.Map.createView({
    annotations: [addedLocation],
    region: {
      latitude: contact.coords.latitude,
      longitude: contact.coords.longitude
    }
  });
  self.add(map);
  
  map.selectAnnotation(addedLocation);
  
  return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ContactMapWindow;
