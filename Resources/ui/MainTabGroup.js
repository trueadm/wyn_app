"use strict";

var Settings = require('/data/Settings'),
  NewNumberWindow = require('/ui/windows/NewNumberWindow'),
  ListWindow = require('/ui/windows/ListWindow'),
  MyNumberWindow = require('/ui/windows/MyNumberWindow');

function MainTabGroup() {
  var self = Ti.UI.createTabGroup();
  
  self.showMainTabs = function () {
    
    //init the windows for each tab
    self.newNumberWindow = new NewNumberWindow(self);
    self.listWindow = new ListWindow(self);
    self.myNumberWindow = new MyNumberWindow(self);
        
    //create app tabs
    var tab1 = Ti.UI.createTab({
      title: 'Add',
      icon: '/images/tab_addnumber_icon.png',
      window: self.newNumberWindow
    });
    self.newNumberWindow.containingTab = tab1;
    
    var tab2 = Ti.UI.createTab({
      title: 'Recent',
      icon: '/images/tab_list_icon.png',
      window: self.listWindow
    });
    self.listWindow.containingTab = tab2;
    
    var tab3 = Ti.UI.createTab({
      title: 'My Number',
      icon: '/images/tab_mynumber_icon.png',
      window: self.myNumberWindow
    });
    self.myNumberWindow.containingTab = tab3;
    
    self.addTab(tab1);
    self.addTab(tab2);
    self.addTab(tab3);
    
    self.activeTab = tab1;
  };
  
  self.showMainTabs();
  
  return self;
}

module.exports = MainTabGroup;
