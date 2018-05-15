const chat_database = require('../libs/chat_database.js');
const colors = require('colors');
const async = require('async');
const iconv = require('iconv-lite');

function format(str) {
	var result = {};
	var compares = str.split('&');
	compares.forEach(function(compare) {
		var pair = compare.split('=');
		if (pair[0]) {
			var key = pair[0];
			var value = pair[1];
			result[key] = value;
		}
	});
	return result;
}
module.exports = function(req, res) {
	var bufs = [];
	req.on('data', function(data) {
		bufs.push(data);
	});
	req.on('end', function() {
		var buf = Buffer.concat(bufs);
		var result = iconv.decode(buf, 'utf8');
		var params = format(result);
		Object.keys(params).forEach(function(key) {
			req.params[key] = params[key];
		});
		var post = req.params;
		var obj = {
			post: post,
			req: req,
			res: res,
		};

		async.waterfall([
			function(callback) {
				// 登陆等一系列操作
				chat_database.login(post, callback)
			},
			function(result, user, callback) {
				//result 代表登陆操作的结果
				try {
					if (result) {
						var session = req.session;
						session.user = user;
						callback(null, result, user);
					} else {
						callback(null, result, user);
					}
				} catch (err) {
					callback(err);
				}
				//更行用户登录的状态
			},
			function(result, user, callback) {
				try {
					if (result) {
						chat_database.find('rooms', user, function(err, rooms) {
							if (err) {
								callback(err);
							} else {
								var room = rooms[0];
								callback(null, result, user, room)
							}
						})
					} else {
						callback(null, result, user, null);
					}
				} catch (err) {
					callback(err);
				}
			},
			function (result, user, room,callback) {
				try {
					if (result) {
						var session = req.session;
						session.room = room;
						callback(null, result, user, room);
					} else {
						callback(null, result, user, room);
					}
				} catch (err) {
					callback(err);
				}
				//更行用户登录的状态
			}
		], function(err, result, user, room) {
			if (err) {
				res.writeHead(500, {
					'Content-Type': 'text/plain;charset:utf-8'
				});
				res.end(JSON.stringify(err));
				throw err;
				return;
			}
			var obj1 = {
				user: user,
				verify: result,
				room : room,
			}
			res.writeHead(200, {
				'Content-Type': 'text/plain;charset:utf-8'
			});
			res.end(JSON.stringify(obj1));
		});
	});
}