function SettingsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Settings',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	//make the table
	var settingsTableData =	[
		{title:'Edit my details', header:'My Profile', hasChild: true, selectedBackgroundColor: '#0ba711'},,
		{title:'Show activity on Facebook', header:'Social Media', hasChild: true, selectedBackgroundColor: '#0ba711'},
		{title:'Send reminders after', header:'Reminders', selectedBackgroundColor: '#0ba711'},
		//{title:'Send criteria', hasChild: true, selectedBackgroundColor: '#0ba711'},
		{title:'Personalise message', hasChild: true, selectedBackgroundColor: '#0ba711'},
		{title:'Fake low battery warning', header:'Helpful Tricks', selectedBackgroundColor: '#0ba711'},
		{title:'Fake SMS message', hasChild: true, selectedBackgroundColor: '#0ba711'},
	];
	
	var settingsTable = Ti.UI.createTableView({
		data: settingsTableData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	self.add(settingsTable);
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = SettingsWindow;
