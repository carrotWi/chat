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
			post.name = post.space;
			var session = req.session;
			/**
			
				TODO:
				- 添加一个房间
			
			 */
			 // ready(req,res,post)
			 // .then(query)
			 // .then(send)
			 // .catch(send);

			 //从session 拿到 user
			 async.waterfall([
			 		function (callback) {
			 			// session 读取 user
			 			if (session.user) {
			 				var user = session.user;
			 				post.user_id = user.id;
			 				callback(null,true);
			 			} else {
			 				callback(null,false);
			 			}
			 		},
			 		function (result,callback) {
			 			//result 代表 session 是否有 user
			 			if (result) {
			 				chat_database.add_room(post,callback);
			 			} else {
			 				var err = new Error('未登陆');
			 				callback(err);
			 			}
			 			// 数据库的逻辑
			 			
			 		},
			 		function (result,room,callback) {
			 			//result 为 true 代表数据库有重复的房间
			 			var data = {
			 				room : room,
			 				verify : result,
			 			}
			 			callback(null,data);
			 		}
			 	],function (err,result) {
			 		if (err) {
			 			res.writeHead(500,{'Content-Type': 'text/plain;charset:utf-8'});
			 			res.end(JSON.stringify(err));
			 			throw err;
						return ;
			 		}
			 		res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
			 		res.end(JSON.stringify(result));
			 });
	});
}

//数据库的逻辑
function query(obj) {
	var opt = obj.post;
	return new Promise(function (resole,reject) {
		chat_database.add_room(opt,function (err,result) {
			//result 为 true 代表数据库有重复的房间
			obj.verify = result;
			if (result) {
				reject(obj);
			} else {
				resole(obj)
			}
		});
	});
}

//promise 开始参数
function ready() {
	var args = arguments;
	var obj = {
		req : args[0],
		res : args[1],
		post : args[2],
	}
	return new Promise(function (resole,reject) {
		if (obj.length === 3) {
			resole(obj);
		} else {
			var err = new Error(obj);
			reject(err);
		}
	});
}

//更新session
// function update_session(obj) {
// 	return new Promise(function (resole,reject) {
		
// 	}
// }
//发送
function send(obj) {
	var req = obj.req;
	var res = obj.res;
	return new Promise(function (resolve,reject) {
		var data = {
			room : obj.post,
			verify : obj.verify,
		}
		res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
		res.end(JSON.stringify(data));
	});
}
