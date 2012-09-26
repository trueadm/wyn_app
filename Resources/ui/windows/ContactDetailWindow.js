function ContactDetailWindow(parentWindow, contact) {
	
	var Utils = require('PhoneNumberUtils');
	
	var self = Ti.UI.createWindow({
		title: contact.getName(),
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_white.png',
		parentWindow: parentWindow,
		containingTab: parentWindow.containingTab,
	});
	
	var data = [];
	
	if (contact.image) {
		console.log(contact.image.width);
		var photoRow = Ti.UI.createTableViewRow();
		var image = Ti.UI.createImageView({
			left: 0,
			width: 100,
			height: 100,
		});
		photoRow.add(image);
		data.push(photoRow);
		image.setImage(contact.image);
	}
	
	data.push({title: Utils.formatNumber(String(contact.phone.mobile))});
	
	if (contact.email.home) {
		data.push({title: String(contact.email.home)});
	}
	
	data.push({header: 'Added', title: contact.formatCreated()});
	
	if (contact.hasCoords()) {
		var showMap = Ti.UI.createTableViewRow({
			'title': contact.getPlaceName(),
			'hasDetail': true
		});
		data.push(showMap);
		
		showMap.addEventListener('click', function() {
			var ContactMapWindow = require('ui/windows/ContactMapWindow');
			self.containingTab.open(new ContactMapWindow(self, contact));
		});	
	}
	
	var call = Titanium.UI.createButton({
	    title: 'Call',
	    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	call.addEventListener('click', function() {
		Ti.Platform.openURL('tel:' + String(contact.phone.mobile));
	})
	
	var toolbar = Titanium.UI.iOS.createToolbar({
	    items:[call],
	    bottom:0,
	    borderTop:true,
	    borderBottom:false
	});
	self.add(toolbar);
	
	var table = Ti.UI.createTableView({
		top: 10,
		bottom: 49,
		data: data,
	});
	self.add(table);
	
	return self;
}

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = ContactDetailWindow;