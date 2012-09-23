/**
 * Fetch all AppContacts
 */
exports.getAll = function() {
	return Ti.App.Properties.getList('contacts', []);
}

/**
 * Add a new AppContact
 * @param {Object} appContact
 */
exports.add = function(appContact) {
	var all = Ti.App.Properties.getList('contacts', []);
	all.push(appContact);
	Ti.App.Properties.setList('contacts', all);
}