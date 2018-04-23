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
			var obj = {
				post : post,
				req : req,
				res : res,
			};
			//try promise
			// login(obj)
			// .then(send)
			// .catch(send);

			async.waterfall([
					function (callback) {
						// 登陆等一系列操作
						chat_database.login(post,callback)
					},
					function (result,user,callback) {
						//result 代表登陆操作的结果
						try{
							if (result) {
								var session = req.session;
								session.user = user;
								callback(null,result,user);
							} else {
								callback(null,result,user);		
							}
						}catch(err){
							callback(err);
						}
						//更行用户登录的状态
					}
				],function (err,result,user) {
				if (err) {
					res.writeHead(500,{'Content-Type': 'text/plain;charset:utf-8'});
					res.end(JSON.stringify(err));
					throw err;
					return;
				}
				var obj1 = {
					user : user,
					verify : result,
				}
				res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
				res.end(JSON.stringify(obj1));
			});
	});
}


/*===============================
=            promise            =
===============================*/

//登陆的一系列操作
function login(obj) {
	var post = obj.post;
	return new Promise(function (resolve,reject) {
		chat_database.login(post,function (err,result) {
			if (err) {
				throw err;
			}
			obj.user = post;
			obj.verify = result;
			if (result) {
				resolve(obj);
			}else{
				reject(obj);
			}
		});
	});
}

//更行用户登录的状态
function update_session(obj) {
	
}

//发送结果
function send(obj) {
	var req = obj.req;
	var res = obj.res;
	return new Promise(function (resolve,reject) {
		var obj1 = {
			user : obj.post,
			verify : obj.verify,
		}
		res.writeHead(200,{'Content-Type': 'text/plain;charset:utf-8'});
		res.end(JSON.stringify(obj1));
	});
}


/*=====  End of promise  ======*/

