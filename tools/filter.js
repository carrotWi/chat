module.exports = function _map(obj,fn,callback) {
	var result = {};
	Object.keys(obj).forEach(function (key) {
		debugger
		var flag = fn(obj[key]);
		if (flag) {
			result[key] = obj[key];
		}
	});
	callback(null,result);
}