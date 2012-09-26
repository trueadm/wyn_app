function YourDetailsWindow(parentWindow) {
	//Add Save button, but it at bottom of screen
	var saveButton = Ti.UI.createButton({
		title: 'Done',
		enabled: false
	});
	
	var self = Ti.UI.createWindow({
		title:'Your Details',
		parentWindow: parentWindow,
		containingTab: parentWindow.containingTab,
		backButtonTitle: 'Back',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_lined.png',
		rightNavButton: saveButton,
	});
	
	self.add(Ti.UI.createLabel({
		top: 41,
		left: 15,
		text: 'FIRST NAME:',
		font: {fontSize: 12}
	}));
	
	var firstNameField = Ti.UI.createTextField({
		top: 26,
		left: 100,
		width: 210,
		font:{fontSize:32, fontFamily:'Rabiohead'},
		color: '#01215b',
	});
	self.add(firstNameField);
	
	self.add(Ti.UI.createLabel({
		top: 71,
		left: 15,
		text: 'LAST NAME:',
		font: {fontSize: 12}
	}));
	
	var lastNameField = Ti.UI.createTextField({
		top: 58,
		left: 100,
		width: 210,
		hintText: '(optional)',
		font:{fontSize:28, fontFamily:'Rabiohead'},
		color: '#01215b',
	});
	self.add(lastNameField);

	self.add(Ti.UI.createLabel({
		top: 101,
		left: 15,
		text: 'EMAIL:',
		font: {fontSize: 12}
	}));

	//add first name text field
	var emailField = Ti.UI.createTextField({
		top: 88,
		left: 100,
		width: 210,
		hintText: '(optional)',
		font:{fontSize:28, fontFamily:'Rabiohead'},
		color: '#01215b',
		keyboardType: Ti.UI.KEYBOARD_EMAIL
	});
	self.add(emailField);
	
	var cameraButton = Ti.UI.createButton({
		top: 215,
		title: 'Take a photo'
	});
	self.add(cameraButton);
	
	var clearPhotoButton = Ti.UI.createButton({
		top: 215,
		title: 'Clear',
		visible: false
	});
	self.add(clearPhotoButton);
	
	var photoPreview = Ti.UI.createImageView({
		top: 190,
		left: 20,
		width: 100,
		height: 100,
		visible: false,
		
	});
	self.add(photoPreview);
	
	self.containingTab.setRightNavButton(saveButton);
	
	// Focus first name field on load
	self.addEventListener('open', function() {
		firstNameField.focus();	
	});
	
	firstNameField.addEventListener('return', function(){
		lastNameField.focus();
	});
	lastNameField.addEventListener('return', function(){
		emailField.focus();
	});
	
	function setPhoto(photo) {
		self.photo = photo;
		cameraButton.hide();
		photoPreview.show();
		clearPhotoButton.show();
		photoPreview.setImage(photo);		
	}
	
	function clearPhoto() {
		self.photo = null;
		cameraButton.show();
		photoPreview.hide();
		clearPhotoButton.hide();
	}
	
	cameraButton.addEventListener('click', function(){
		Ti.Media.showCamera({
			mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
			success: function(event) {
				setPhoto(event.media);
			},
			error: function(error) {
				var a = Titanium.UI.createAlertDialog({title:'Camera'});
				if (error.code == Titanium.Media.NO_CAMERA) {
					setPhoto(Titanium.Filesystem.getFile('images/test_photo.jpg').read());
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
			},
		});
	});
	
	clearPhotoButton.addEventListener('click', clearPhoto);
	
	firstNameField.addEventListener('change', function(event) {
		if (firstNameField.value) {
			saveButton.enabled = true;	
		} else {
			saveButton.enabled = false;
		}
	});
	
	saveButton.addEventListener('click', function(){
		// Validate form
		var error;
		
		if (!firstNameField.value) {
			error = 'You need to enter at least a first name';
		}
		if (error) {
			var statusAlert = Titanium.UI.createAlertDialog({
				title: 'Oops!',
				message: error
			});
			statusAlert.show();
			
		} else {
			// Create phone contact
			var person = {
				phone: {mobile: [parentWindow.phoneNumber]},
				firstName: firstNameField.value,
			}
			if (lastNameField.value) {
				person.lastName = lastNameField.value;
			}
			if (emailField.value) {
				person.email = {home: [emailField.value]};
			}
			if (self.photo) {
				person.image = self.photo;
			}
			var phoneContact = Ti.Contacts.createPerson(person);
			
			// Try to get geo location
			
			Titanium.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
			Ti.Geolocation.purpose = 'Tag number with your current location';
		
			var AppContacts = require('data/AppContacts');
			var contact = {
				id: phoneContact.recordId,
				coords: null,
				places: null,
				created: new Date().getTime()
			};
			
			Ti.Geolocation.getCurrentPosition(function(event) {
				if (event.success) {
					contact.coords = event.coords;
					Ti.Geolocation.reverseGeocoder(event.coords.latitude, event.coords.longitude, function(response) {
						if (response.success) {
							contact.places = response.places;
						}
						AppContacts.add(contact);
					})
				} else {
					AppContacts.add(contact);
				}
			});
			
			// Show thank you window
			var ThankYouWindow = require('ui/windows/ThankYouWindow'),
				thankYouWindow = new ThankYouWindow(self);
				
			self.containingTab.open(thankYouWindow);
		}
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = YourDetailsWindow;
