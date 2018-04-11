module.exports = function _zip(obj1,obj2,callback) {
	result = {};
	Object.keys(obj2).forEach(function (key2) {
		obj1[key2] = obj2[key2];
	});
	callback(null,result)
}