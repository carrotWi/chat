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
			chat_database.login(post,function (err,result) {
				if (err) {
					throw err;
					return;
				}
				if (result) {
					res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
					var obj = {
						verify : result,
						user : post,
					}
					res.end(JSON.stringify(obj));
				}else{
					res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
					var obj = {
						verify : result,
					}
					res.end(JSON.stringify(obj));
				}
			});
	});
}