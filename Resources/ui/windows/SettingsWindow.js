function SettingsWindow(parentWindow) {
	var self = Ti.UI.createWindow({
		title:'Settings',
		backgroundColor:'white',
		parentWindow: parentWindow,
		barColor: '#0ba711',
	});
	
	var fbLogin = Ti.UI.createTableViewRow({
		header:'Social Media', selectedBackgroundColor: '#0ba711'
	});
	
	function setFbLoginState() {
		if (Ti.Facebook.loggedIn) {
			fbLogin.title = 'Disconnect from Facebook';
		} else {
			fbLogin.title = 'Connect to Facebook';
		}
	}
	
	Ti.Facebook.addEventListener('login', setFbLoginState);
	Ti.Facebook.addEventListener('logout', setFbLoginState);
	setFbLoginState();
	
	fbLogin.addEventListener('click', function(){
		if (Ti.Facebook.loggedIn) {
			Ti.Facebook.logout();
		} else {
			Ti.Facebook.authorize();
		}
	});
	
	//make the table
	var settingsTableData =	[
		{title:'Edit my details', header:'My Profile', hasChild: true, selectedBackgroundColor: '#0ba711'},,
		fbLogin,
		{title:'Connect to Twitter', selectedBackgroundColor: '#0ba711'},
		//{title:'Send reminders after', header:'Reminders', selectedBackgroundColor: '#0ba711'},
		//{title:'Send criteria', hasChild: true, selectedBackgroundColor: '#0ba711'},
		{title:'My Number templates', header:'Personalise', hasChild: true, selectedBackgroundColor: '#0ba711'},
		{title:'Keypad theme',  selectedBackgroundColor: '#0ba711'},
		//{title:'Fake SMS message',header: 'Helpful Tricks', hasChild: true, selectedBackgroundColor: '#0ba711'},
		//{title:'Fake low battery warning', selectedBackgroundColor: '#0ba711'},
	];
	
	var settingsTable = Ti.UI.createTableView({
		data: settingsTableData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	self.add(settingsTable);
	
	//self.add(fb);
	
	
	
	return self;
};

//as we're getting this window as a part of a require, we'll need to expose the scope
module.exports = SettingsWindow;
