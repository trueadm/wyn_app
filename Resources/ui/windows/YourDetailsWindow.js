function YourDetailsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Your Details',
		parentWindow: parentWindow,
		containingTab: parentWindow.containingTab,
		backButtonTitle: 'Back',
		barColor: 'black',
		barImage: 'images/navbar_leather.png',
		backgroundColor:'white',
		backgroundImage: 'images/bg_lined.png',
	});
	
	var firstNameField = Ti.UI.createTextField({
		top: 15,
		left: 20,
		width: 280,
		height: 55,
		hintText: 'First name',
		left: 15,
		width: 280,
		height: 55,
		font:{fontSize:46, fontFamily:'Rabiohead'},
		color: '#01215b',
	});
	self.add(firstNameField);
	
	var lastNameField = Ti.UI.createTextField({
		top: 85,
		left: 20,
		width: 280,
		height: 40,
		hintText: 'Last name (optional)',
		left: 15,
		width: 280,
		height: 40,
		font:{fontSize:32, fontFamily:'Rabiohead'},
		color: '#01215b',
	});
	self.add(lastNameField);

	//add first name text field
	var emailField = Ti.UI.createTextField({
		top: 145,
		left: 20,
		width: 280,
		height: 40,
		hintText: 'Email address (optional)',
		left: 15,
		width: 280,
		height: 40,
		font:{fontSize:32, fontFamily:'Rabiohead'},
		color: '#01215b',
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
	
	//Add Save button, but it at bottom of screen
	var saveButton = Ti.UI.createButton({
		height:55,
		width:288,
		//title:L('Save'),
		bottom: 12,
		backgroundImage: 'images/add_button.png',
	});
	self.add(saveButton);
	
	//we use a label as we have better control over how it looks via the title of a button
	var buttonTextLabel = Ti.UI.createLabel({
		text: 'Save',
		font:{fontSize:22, fontWeight: 'bold', fontFamily:'Helvetica Neue'},
		textAlign:'center',
		shadowOffset:{x:0,y:2},
		shadowColor:'#16950d',
		color: '#fff',
		width: saveButton.width,
		zIndex: 2,
		height: saveButton.height - 5,
		touchEnabled: false,
	});
	saveButton.add(buttonTextLabel);
	
	// Focus first name field on load
	self.addEventListener('open', function() {
		firstNameField.focus();	
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
			
			// Null by default
			var coords = null;
			
			Titanium.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
			Ti.Geolocation.purpose = 'Tag number with your current location';
			
			Ti.Geolocation.getCurrentPosition(function(event) {
				if (event.success) {
					coords = event.coords
				}
				// Store contact
				var AppContacts = require('data/AppContacts');
				AppContacts.add({
					id: phoneContact.recordId,
					coords: event.coords,
					created: new Date().getTime()
				});
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
