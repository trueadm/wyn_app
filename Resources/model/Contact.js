"use strict";

var AppContacts = require('/data/AppContacts'),
  utils = require('/PhoneNumberUtils');

function Contact(appContact) {
  this.id = null;
  this.coords = null;
  this.places = null;
  this.created = null;
  this.firstName = null;
  this.lastName = null;
  this.fullName = null;
  this.phone = null;
  this.image = null;
  this.messages = [];

  this.isValid = function () {
    this.messages = [];
    if (!this.firstName) {
      this.messages.push('Please enter a name for this contact');
    }
    return (this.messages.length === 0);
  };

  this.getMessages = function () {
    return this.messages;
  };

  this.setPhoneContact = function (phoneContact) {
    Titanium.API.log('Phone contact: ' + JSON.stringify(phoneContact));
    if (phoneContact) {
      if (!phoneContact.firstName && phoneContact.fullName) {
        this.setName(phoneContact.fullName);
      } else {
        this.firstName = phoneContact.firstName;
        this.lastName = phoneContact.lastName;
      }
      this.image = phoneContact.image;

      // Get phone type in order of preference
      if (phoneContact.phone.mobile) {
        this.phone = phoneContact.phone.mobile[0];
      } else if (phoneContact.phone.home) {
        this.phone = phoneContact.phone.home[0];
      } else if (phoneContact.phone.work) {
        this.phone = phoneContact.phone.work[0];
      }
    }
  };

  this.save = function () {
    var self = this;

    var doSave = function () {
      var phoneContact = self.createPhoneContact();
      
      // Android stores ID in a different property
      if (Ti.Platform.osname === 'android') {
        self.id = phoneContact.id;  
      } else {
        self.id = phoneContact.recordId
      }
      
      self.created = new Date().getTime();
      
      Titanium.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
      Ti.Geolocation.purpose = 'Tag number with your current location';

      Ti.Geolocation.getCurrentPosition(function (event) {
        if (event.success) {
          self.coords = event.coords;
          
          // Now try to get place name
          Ti.Geolocation.reverseGeocoder(event.coords.latitude, event.coords.longitude, function (response) {
            if (response.success) {
              self.places = response.places;
            }
            AppContacts.add({
              id: self.id,
              coords: self.coords,
              places: self.places,
              created: self.created
            });
          });
        } else {
          AppContacts.add({
            id: self.id,
            coords: self.coords,
            places: self.places,
            created: self.created
          });
        }
      });
    };

    if (Ti.Contacts.contactsAuthorization === Ti.Contacts.AUTHORIZATION_AUTHORIZED) {
      doSave();
    } else if (Ti.Contacts.contactsAuthorization === Ti.Contacts.AUTHORIZATION_UNKNOWN) {
      Ti.Contacts.requestAuthorization(function (e) {
        if (e.success) {
          doSave();
        }
      });
    }
  };

  this.createPhoneContact = function () {
    var contactPhone = {};
    contactPhone[this.getPhoneType()] = [this.phone];
    var person = {
      phone: contactPhone,
      firstName: this.firstName
    };
    if (this.lastName) {
      person.lastName = this.lastName;
    }
    if (this.photo) {
      person.image = this.photo;
    }
    var phoneContact = Ti.Contacts.createPerson(person);
    return phoneContact;
  };

  this.getPhoneType = function () {
    var realType = utils.getType(this.phone);
    var contactType = 'home';
    if (realType === 'mobile') {
      contactType = 'mobile';
    }
    return contactType;
  };

  /**
   * Get full formatted name
   */
  this.getName = function () {
    var name = this.firstName;
    if (this.lastName) {
      name += ' ' + this.lastName;
    }
    return name;
  };

  /**
   * Tries to guess first/last names from a full name 
   */
  this.setName = function (fullName) {
    var names = fullName.split(' ');
    this.lastName = null;
    if (names.length > 1) {
      // Assume single last name
      this.lastName = names.pop();
    }
    // Put all other names in first name
    this.firstName = names.join(' ');
  };

  /**
   * Get string to use as table heading
   */
  this.getDateHeading = function () {
    var now = new Date(),
      created = this.created,
      age = now.getTime() - created.getTime(),
      heading;
      
    if (created.getDate() === now.getDate()
        && created.getMonth() === now.getMonth()
        && created.getYear() === now.getYear()) {
      heading = 'Today';
    } else if (created.getDate() === now.getDate() - 1
        && created.getMonth() === now.getMonth()
        && created.getYear() === now.getYear()) {
      heading = 'Yesterday';
    } else if (age < 604800000) {
      heading = 'Last 7 days';
    } else if (age < 2592000000) {
      heading = 'Last 30 days';
    } else {
      heading = 'Older';
    }
    return heading;
  };

  this.formatNumber = function () {
    return utils.formatNumber(this.phone);
  };

  this.formatCreated = function () {
    var date = this.created.getDate(),
      month = this.created.getMonth() + 1, //Months are zero based
      year = this.created.getFullYear(),
      hours = ('0' + this.created.getHours()).slice(-2),
      minutes = ('0' + this.created.getMinutes()).slice(-2);
    return hours + ':' + minutes + ' ' + date + "/" + month + "/" + year;
  };

  this.getPlaceName = function () {
    var placeName = null;
    if (this.hasAddress()) {
      placeName = this.places[0].address;
    } else if (this.hasCoords()) {
      placeName = this.coords.latitude.toFixed(7) + ', ' + this.coords.longitude.toFixed(7);
    }
    return placeName;
  };

  this.hasCoords = function () {
    return (this.coords !== null);
  };
  
  this.hasAddress = function () {
    return (this.places !== null && this.places.length > 0);
  };
    
  if (appContact) {
    this.id = appContact.id;
    this.coords = appContact.coords;
    this.places = appContact.places;
    this.created = new Date(appContact.created);
       
    // Get data from associated phone contact entry
    if (this.id) {
      this.setPhoneContact(Ti.Contacts.getPersonByID(this.id));
    }
  }
}

module.exports = Contact;
