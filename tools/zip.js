module.exports = function (arr1,arr2,fn) {
	result = [];
	for (var i = 0; i < Math.min(arr1.length,arr2.length); i++) {
		result.push(fn(arr1[i],arr2[i]));
	}
	return result;
}