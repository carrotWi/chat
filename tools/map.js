module.exports = function (obj,fn) {
	var result = {};
	Object.keys(obj).forEach(function (key) {
		result[key] = fn(obj[key]);
	});
	return result;
}