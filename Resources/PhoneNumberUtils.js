/**
 * Add spaces to phone nubmer
 * @param {String} number
 */
exports.formatNumber = function (number) {
	var formatted = number;
	// International prefix
	formatted = formatted.replace(/^00/, '00 ');
	// International code
	formatted = formatted.replace(/^00 ([0-9]{2})/, '00 $1 ');
	// National code following international prefix/code
	formatted = formatted.replace(/^00 ([0-9]{2} [0-9]{4})/, '00 $1 ');
	// National code
	formatted = formatted.replace(/^(0?)([0-9]{4})/, '$1$2 ');
	
	return formatted;
}

exports.tooLong = function(number) {
	var maxLength;
	// International
	if (number.indexOf('00') === 0) {
		maxLength = 14;
	// UK
	} else {
		maxLength = 11;
	}
	return number.length > maxLength;
}
