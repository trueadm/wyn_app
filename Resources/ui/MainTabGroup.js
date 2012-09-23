function MainTabGroup() {
	var self = Ti.UI.createTabGroup(),
		Settings = require('data/Settings'),
		welcomeTab;
	
	//if the user has entered their name and number, show them the tabgroup with normal window 
	//if not show them a different tabgroup, but with only the edit details window
	//we need to use a tabgroup to have the nice titlebar at the top
	
	self.showWelcomeWindow = function() {
		var WelcomeWindow = require('ui/windows/WelcomeWindow');
		welcomeTab = Ti.UI.createTab({
			title: '',
			icon: '/images/tab_addnumber_icon.png',
			window: new WelcomeWindow(self),	
		});
		self.addTab(welcomeTab);
	}
	
	self.showMainTabs = function() {
		
		//init the windows for each tab
		var NewNumberWindow = require('ui/windows/NewNumberWindow');
		self.newNumberWindow = new NewNumberWindow(self);
		
		var ListWindow = require('ui/windows/ListWindow');
		self.listWindow = new ListWindow();
		
		var MyNumberWindow = require('ui/windows/MyNumberWindow');
		self.myNumberWindow = new MyNumberWindow();	
		
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
			title: L('Recent'),
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
		
		self.activeTab = tab1;
		
		if (welcomeTab != null) {
			self.removeTab(welcomeTab);
		}
	}
	
	// Show welcome window on first load
	if (Settings.get('name') == null && Settings.get('number') == null) {	
		self.showWelcomeWindow();	
	} else {
		self.showMainTabs();
	}	
	
	return self;
};

module.exports = MainTabGroup;