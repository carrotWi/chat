const chat_database = require('../libs/chat_database.js');
const colors = require('colors');
const async = require('async');
const iconv = require('iconv-lite');

function format(str) {
	var result = {};
	var compares = str.split('&');
	compares.forEach(function (compare) {
		var pair = compare.split('=');
		if (pair[0]) {
			var key = pair[0];
			var value = pair[1];
			result[key] = value; 
		}
	});
	return result;
}	
module.exports = function (req,res) {
	var bufs = [];
	req.on('data',function (data) {
		bufs.push(data);
	});
	req.on('end',function () {
			var buf = Buffer.concat(bufs);
			var result = iconv.decode(buf,'utf8');
			var params = format(result);
			Object.keys(params).forEach(function (key) {
				req.params[key] = params[key];
			});
			var post = req.params;
			/**
			
				TODO:
				- 添加一个房间
			
			 */
			debugger
	});
}