const chat_mysql = require('./chat_mysql.js');
const async = require('async');
const tools = require('../tools/index.js');
module.exports = function () {
	
	function verify(obj,cb) {
		try{
			 //校验用户名是否存在
			if (obj.name) {
				has_user_name(obj,cb);
			}
			//检验房间是否存在
			if (obj.space) {
				has_room(obj,cb);
			}
			
		}catch(err){
			cb && cb(err);
		}
	}

	function try_login(obj,cb) {
		//尝试登陆
		if (obj.name && obj.password) {
				has_user_name_password(obj,cb);
			}
	}

	function has_room(obj,cb) {
		async.waterfall([
				function (callback) {
					chat_mysql.all('room',callback);
				},
				function (rooms,callback) {
					tools('filter',rooms,function (room) {
						return (room.space===obj.space);
					},callback);
				},
				function (rooms,callback) {
					if (rooms.length) {
						callback(null,true);
					} else {
						callback(null,false);
					}
				}
			],function (err,result) {
			if (err) {
				cb && cb(err)
			} else {
				cb(null,result);
			}
		});
	}

	function has_user_name(obj,cb) {
		async.waterfall([
						function (callback) {
							chat_mysql.all('user',callback);
						},
						function (users,callback) {
							tools('filter',users,function (user) {
								return (user.name===obj.name);
							},callback);
						},
						function (users,callback) {
							if (users.length) {
								callback(null,true);
							} else {
								callback(null,false);
							}
						}
					],function (err,result) {
					if (err) {
						cb && cb(err)
					} else {
						cb(null,result);
					}
				});
	}

	function has_user_name_password(obj,cb) {
		async.waterfall([
				function (callback) {
					chat_mysql.all('user',callback);
				},
				function (users,callback) {
					tools('filter',users,function (user) {
						return (user.name===obj.name) && (user.password===obj.password);
					},callback);
				},
				function (users,callback) {
					if (users.length) {
						callback(null,true);
					} else {
						callback(null,false);
					}
				}
			],function (err,result) {
			if (err) {
				cb && cb(err)
			} else {
				cb(null,result);
			}
		});
	}

	function find_users(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_mysql.all('user',callback);
					},
					function (users,callback) {
						tools('filter',users,function (u) {
							return opt.name===u.name;
						},callback);
					}
				],function (err,users) {
				if (err) {
					throw err;
					return
				}
					cb && cb(null,users);
			});
		}catch(err){
			cb && cb(err);
			return;
		}
	}

	function find_rooms(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_mysql.all('room',callback);
					},
					function (rooms,callback) {
						tools('filter',rooms,function (room) {
							return room.id===opt.room_id;
						},callback)
					}
				],function (err,rooms) {
					if (err) {
						throw err;
						return
					}
					cb && cb(null,rooms);
			});
		}catch(err){
			throw err;
			return ;
		}
	}

	function find_msgs(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_mysql.all('msg',callback);
					},
					function (msgs,callback) {
						tools('filter',msgs,function (msg) {
							return msg.room_id===opt.id;
						},callback)
					}
				],function (err,msgs) {
					if (err) {
						throw err;
						return
					}
					cb && cb(null,msgs);
			});
		}catch(err){
			cb && cb(err);
			return
		}
	}


	function find (table) {
		var arg = _slice(arguments,1);
		switch(table) {
			case 'rooms':
				find_rooms.apply(null,arg);
				break;
			case 'users':
				find_users.apply(null,arg);
				break;
			case 'msgs':
				find_msgs.apply(null,arg);
				break;
			default : throw 'not table';
				break;
		}
	}



	return {
		verify : verify,
		find : find,
		login : try_login,
	}
}();

function _slice(obj,index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}