function ContactMapWindow(parentWindow, contact) {
	
	var self = Ti.UI.createWindow({
		title: 'Added here',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
		parentWindow: parentWindow,
		containingTab: parentWindow.containingTab,
	});
	
	var addedLocation = Titanium.Map.createAnnotation({
	    latitude: contact.coords.latitude,
	    longitude: contact.coords.longitude,
	    title: contact.getPlaceName(),
	    subtitle: contact.formatCreated(),
	    pincolor: Titanium.Map.ANNOTATION_RED,
	    animate: true,
	});
	
	var map = Ti.Map.createView({
		annotations: [addedLocation],
		region: {
		    latitude: contact.coords.latitude,
		    longitude: contact.coords.longitude,
		}
	});
	self.add(map);
	
	map.selectAnnotation(addedLocation);
	
	return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ContactMapWindow;