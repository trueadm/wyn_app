"use strict";

var AppContacts = require('data/AppContacts'),
  utils = require('PhoneNumberUtils');

function Contact(appContact) {
  if (appContact) {
    this.id = appContact.id;
    this.coords = appContact.coords;
    this.places = appContact.places;
    this.created = new Date(appContact.created);
       
    // Get data from associated phone contact entry
    this.setPhoneContact(Ti.Contacts.getPersonByID(this.id));
  }
}

Contact.prototype = {
  id: null,
  coords: null,
  places: null,
  created: null,
  firstName: null,
  lastName: null,
  phone: null,
  image: null,
  messages: [],

  isValid: function () {
    this.messages = [];
    if (!this.firstName) {
      this.messages.push('Please enter a name for this contact');
    }
    return (this.messages.length === 0);
  },

  getMessages: function () {
    return this.messages;
  },

  setPhoneContact: function (phoneContact) {
    if (phoneContact) {
      this.firstName = phoneContact.firstName;
      this.lastName = phoneContact.lastName;
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
  },

  save: function () {
    var self = this;
    
    this.created = new Date().getTime();
    this.id = this.createPhoneContact().recordId;
    
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
  },

  createPhoneContact: function () {
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
  },

  getPhoneType: function () {
    var realType = utils.getType(this.phone);
    var contactType = 'home';
    if (realType === 'mobile') {
      contactType = 'mobile';
    }
    return contactType;
  },

  /**
   * Get full formatted name
   */
  getName: function () {
    var name = this.firstName;
    if (this.lastName) {
      name += ' ' + this.lastName;
    }
    return name;
  },

  /**
   * Tries to guess first/last names from a full name 
   */
  setName: function (fullName) {
    var names = fullName.split(' ');
    this.lastName = null;
    if (names.length > 1) {
      // Assume single last name
      this.lastName = names.pop();
    }
    // Put all other names in first name
    this.firstName = names.join(' ');
  },

  /**
   * Get string to use as table heading
   */
  getDateHeading: function () {
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
  },

  formatNumber: function () {
    return utils.formatNumber(this.phone);
  },

  formatCreated: function () {
    var date = this.created.getDate(),
      month = this.created.getMonth() + 1, //Months are zero based
      year = this.created.getFullYear(),
      hours = ('0' + this.created.getHours()).slice(-2),
      minutes = ('0' + this.created.getMinutes()).slice(-2);
    return hours + ':' + minutes + ' ' + date + "/" + month + "/" + year;
  },

  getPlaceName: function () {
    var placeName = null;
    if (this.hasAddress()) {
      var place = this.places[0];
      var output = [];
      if (place.street) {
        output.push(place.street);
      }
      if (place.city) {
        output.push(place.city);
      }
      if (place.zipcode) {
        output.push(place.zipcode);
      }
      placeName = output.join(', ');
    } else if (this.hasCoords()) {
      placeName = this.coords.latitude.toFixed(7) + ', ' + this.coords.longitude.toFixed(7);
    }
    return placeName;
  },

  hasCoords: function () {
    return (this.coords !== null);
  },
  
  hasAddress: function () {
    return (this.places !== null && this.places.length > 0);
  }
};

module.exports = Contact;
