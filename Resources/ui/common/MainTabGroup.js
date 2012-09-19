function MainTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//init the windows for each tab
	var NewNumberWindow = require('ui/common/NewNumberWindow');
	self.newNumberWindow = new NewNumberWindow(self);
	
	var MyNumbersWindow = require('ui/common/MyNumbersWindow');
	self.myNumbersWindow = new MyNumbersWindow(self);
	
	//create app tabs
	var tab1 = Ti.UI.createTab({
		title: L('Add Number'),
		icon: '/images/KS_nav_ui.png',
		window: self.newNumberWindow
	});
	self.newNumberWindow.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('My Numbers'),
		icon: '/images/KS_nav_views.png',
		window: self.myNumbersWindow
	});
	self.newNumberWindow.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = MainTabGroup;
