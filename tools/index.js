const map = require('./map.js')
const zip = require('./zip.js')
const filter = require('./filter.js');
const compose = require('./compose.js');
module.exports = function (name) {
	var arg = _slice(arguments,1);
	switch(name) {
		case 'zip':
			zip.apply(null,arg);
			break;
		case 'map':
			map.apply(null,arg);
			break;
		case 'filter':
			filter.apply(null,arg);
			break;
		case 'compse':
			compose.apply(null,arg);
			break;
	}
}
function _slice(obj,index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}