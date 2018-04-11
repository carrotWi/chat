module.exports = function _map(obj,fn,callback) {
	var result = {};
	Object.keys(obj).forEach(function (key) {
		result[key] = fn(obj[key]);
	});
	callback(null,result);
}