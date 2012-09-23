function YourDetailsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Your Details',
		backgroundColor:'#eee',
		parentWindow: parentWindow,
		backButtonTitle: 'Back',
		barColor: '#0ba711',
	});
	
	//add in a first name container view
	var firstNameView = Ti.UI.createView({
		top: 20,
		left: 20,
		width: 280,
		height: 55,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#999',
		backgroundColor: '#fff',		
	});
	self.add(firstNameView);
	
	//add first name text field
	var firstNameField = Ti.UI.createTextField({
		top: 0,
		hintText: 'First name',
		left: 15,
		width: 280,
		height: 55,
		font:{fontSize:24, fontFamily:'Helvetica Neue'},
	});
	firstNameView.add(firstNameField);
	
	//add in a last name container view
	var lastNameView = Ti.UI.createView({
		top: 85,
		left: 20,
		width: 280,
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#999',
		backgroundColor: '#fff',		
	});
	self.add(lastNameView);
	
	//add first name text field
	var lastNameField = Ti.UI.createTextField({
		top: 0,
		hintText: 'Last name (optional)',
		left: 15,
		width: 280,
		height: 40,
		font:{fontSize:18, fontFamily:'Helvetica Neue'},
	});
	lastNameView.add(lastNameField);

	//add in an email container view
	var emailView = Ti.UI.createView({
		top: 135,
		left: 20,
		width: 280,
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#999',
		backgroundColor: '#fff',		
	});
	self.add(emailView);
	
	//add first name text field
	var emailField = Ti.UI.createTextField({
		top: 0,
		hintText: 'Email address (optional)',
		left: 15,
		width: 280,
		height: 40,
		font:{fontSize:18, fontFamily:'Helvetica Neue'},
	});
	emailView.add(emailField);
	
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
		visible: false
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
			
			self.containingTab.open();
		}
	});
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = YourDetailsWindow;
