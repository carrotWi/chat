var chat_database = require('../libs/chat_database.js');
chat_database = chat_database();
var chat_cache_database = require('../libs/chat_cache_database.js');
var m = require('../libs/chat_module.js');
var colors = require('colors');
var async = require('async');
var iconv = require('iconv-lite');
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
		chat_database.verify(post,function (err,result) {
			console.log(result);
			if (result.length) {
				res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
				var obj = {
						enroll : false,
					}
				console.log('该用户已注册');
				res.end(JSON.stringify(obj));
			}else{
				res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
				var name = post.name;
				chat_cache_database.add('user',new m.User().init(post),function (err,user) {
					if (err) {
						throw err;
						return;
					}
					user.enroll = true;
					res.end(JSON.stringify(user));
				});
				
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