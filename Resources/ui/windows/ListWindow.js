"use strict";

var Contact = require('model/Contact'),
  AppContacts = require('data/AppContacts');

function ListWindow(parentWindow) {
  var bg = '/images/bg_white.png';
  if (Ti.Platform.displayCaps.platformHeight === 568) {
    bg = '/images/bg_white-568h.png';
  }
  
  var self = Ti.UI.createWindow({
    title: 'Recently added',
    barColor: 'black',
    barImage: 'images/navbar_leather.png',
    backgroundColor: 'white',
    backgroundImage: bg,
    parentWindow: parentWindow
  });
  
  self.add(Ti.UI.iOS.createAdView({
    adSize: Ti.UI.iOS.AD_SIZE_PORTRAIT,
    bottom: 0
  }));

  var table = Ti.UI.createTableView({top: 10, bottom: 50});
  self.add(table);
  
  table.addEventListener('click', function (event) {
    var ContactDetailWindow = require('ui/windows/ContactDetailWindow');
    self.containingTab.open(new ContactDetailWindow(self, event.rowData.contact));
  });
  
  function populateTable() {
    var tableData = [],
      lastHeading,
      appContacts = AppContacts.getAll();
    
    // Loop through app contacts in reverse order (newest first)
    appContacts.reverse().forEach(function (appContact) {
      // Get model including associated phone data
      var contact = new Contact(appContact);
      
      // Only display if we have some details 
      // (the phone contact may have been deleted)        
      if (contact.firstName) {
        var row = {
          title: contact.getName(),
          hasDetail: true,
          className: 'listItem',
          contact: contact
        };
        // Add heading for first of each group
        var heading = contact.getDateHeading();
        if (heading !== lastHeading) {
          row.header = heading;
          lastHeading = heading;
        }
        // Add row to table
        tableData.push(row);
      }
    });
    
    table.setData(tableData);
  }

  Ti.App.addEventListener('contacts:change', populateTable);
  populateTable();

  return self;
}

module.exports = ListWindow;
