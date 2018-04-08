var chat_database = require('../libs/chat_database.js');
chat_database = chat_database();
var colors = require('colors');
var async = require('async');
var iconv = require('iconv-lite');
var chat_database = require('../libs/chat_database.js');
chat_database = chat_database();
var colors = require('colors');
var async = require('async');
var iconv = require('iconv-lite');

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
			req.params[key] = decodeURIComponent(params[key]);
		});
		var post = req.params;
		chat_database.has_user(post,function (err,result,field) {
			res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
			if (result.length) {
				var str = 'false';
				res.end(str);
			}else{
				var str = 'true';
				res.end(str);
			}
		});
	});
}
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