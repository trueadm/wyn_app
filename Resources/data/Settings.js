var defaults = {
	number: '',
	name:	'',
};

exports.get = function(key) {
	return Ti.App.Properties.getString(key, defaults[key]);
};

exports.set = function(key, value) {
	Ti.App.Properties.setString(key, String(value));
};