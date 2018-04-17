module.exports = function (obj1,obj2) {
	result = {};
	Object.keys(obj2).forEach(function (key2) {
		obj1[key2] = obj2[key2];
	});
	return result;
}