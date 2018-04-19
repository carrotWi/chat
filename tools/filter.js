module.exports = function _map(arr,fn,cb) {
	try{
		var result = [];
		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];
			var flag = fn(obj);
			if (flag) {
				result.push(obj);
			}
		}
		cb && cb(null,result);
	}catch(err){
		cb && cb(err);
	}
}