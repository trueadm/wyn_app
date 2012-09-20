function MainTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//init the windows for each tab
	var NewNumberWindow = require('ui/windows/NewNumberWindow');
	self.newNumberWindow = new NewNumberWindow(self);
	
	var ListWindow = require('ui/windows/ListWindow');
	self.listWindow = new ListWindow(self);
	
	var MyNumberWindow = require('ui/windows/MyNumberWindow');
	self.myNumberWindow = new MyNumberWindow(self);	
	
	var SettingsWindow = require('ui/windows/SettingsWindow');
	self.settingsWindow = new SettingsWindow(self);	
	
	//create app tabs
	var tab1 = Ti.UI.createTab({
		title: L('Add'),
		icon: '/images/tab_addnumber_icon.png',
		window: self.newNumberWindow
	});
	self.newNumberWindow.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('List'),
		icon: '/images/tab_list_icon.png',
		window: self.listWindow
	});
	self.listWindow.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('My Number'),
		icon: '/images/tab_mynumber_icon.png',
		window: self.myNumberWindow
	});
	self.myNumberWindow.containingTab = tab3;	
	
	var tab4 = Ti.UI.createTab({
		title: L('Settings'),
		icon: '/images/tab_settings_icon.png',
		window: self.settingsWindow
	});
	self.settingsWindow.containingTab = tab4;	
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
				
	self.betterAlert = function(header, text, button1Text, button2Text) {
		var statusAlert = Titanium.UI.createAlertDialog({
			title: header,
			message: text,
		});
		
		if(button1Text !== '' && button2Text !== '') {
			statusAlert.buttonNames = [button1Text, button2Text];
		}

		statusAlert.show();	
	};	
	
	return self;
};

//as we're getting this tabgroup as a part of a require, we'll need to expose the scope
module.exports = MainTabGroup;