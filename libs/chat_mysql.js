const m = require('../libs/chat_module.js');
const color = require('colors');
const mysql = require('mysql');
const async = require('async');
const setting = require('../setting.js');

var opt = opt || setting.mysql;

//不断的连接
var connection = mysql.createConnection(opt);
connection.connect();

/*=============================================
=            add         =
=============================================*/
//增加一个user
function _add_user(user, cb) {
	//密码和用户名是必需的
	if (user.name && user.password) {
		async.waterfall([
			function(callback) {
				//存id name 和 password
				var value = [user.name, user.password];
				var sql = 'INSERT INTO user_name_password (name,password) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				user.id = result.insertId;
				//存 enroll_time
				var value = [user.id, user.time];
				var sql = 'INSERT INTO user_enroll_time (user_id,time) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				// 存 login_time
				var value = [user.id, user.time];
				var sql = 'INSERT INTO user_login_time (user_id,time) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存 sex
				if (!user.sex) {
					user.sex = 'none';
				}
				var value = [user.id, user.sex];
				var sql = 'INSERT INTO user_sex (user_id,sex) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存 age
				if (!user.age) {
					user.age = 0;
				}
				var value = [user.id, user.age];
				var sql = 'INSERT INTO user_age (user_id,age) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				// 存 room
				if (!user.room_id) {
					user.room_id = 0;
				}
				var value = [user.id, user.room_id];
				var sql = 'INSERT INTO user_room (user_id,room_id) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存 alias
				if (!user.alias) {
					user.alias = user.name;
				}
				var value = [user.id, user.alias];
				var sql = 'INSERT INTO user_alias (user_id,alias) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存 socket_id
				user.socket_id = '';
				var value = [user.id, user.socket_id];
				var sql = 'INSERT INTO user_socket (user_id,socket_id) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			}
		], function(err, result, filed) {
			if (cb) {
				if (err) {
					cb(err);
					return;
				}
				cb(null, user);
			}
		});
	} else {
		var err = new Error('name or password  undefined ');
		cb(err)
	}

}
//增加一个room
function _add_room(room, cb) {
	var room = new m.Room().init(room);
	if (room.space && room.name && room.user_id) {
		async.waterfall([
			function(callback) {
				//存 spac
				var value = [room.space];
				var sql = 'INSERT INTO room_space (space) VALUES (?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				// 存 name
				room.id = result.insertId;
				var value = [room.id, room.name];
				var sql = 'INSERT INTO room_name (room_id,name) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				// 存 time
				var value = [room.id, room.time];
				var sql = 'INSERT INTO room_create_time (room_id,time) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				var value = [room.id, room.user_id];
				var sql = 'INSERT INTO room_create_user (room_id,user_id) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			}
		], function(err, result, filed) {
			if (err) {
				cb(err);
				return;
			}
			if (cb) {
				cb(null, room);
			}
		});
	} else {
		var err = new Error('space name user_id');
		cb(err);
	}
}
//加入一条消息
function _add_msg(msg, cb) {
	if (msg.user_id && msg.text && msg.room_id) {
		async.waterfall([
			function(callback) {
				//存text
				var value = [msg.text];
				var sql = 'INSERT INTO msg_text (text) VALUES (?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				// 存room_id
				msg.id = result.insertId;
				var value = [msg.id, msg.room_id];
				var sql = 'INSERT INTO msg_room (msg_id,room_id) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存time
				var value = [msg.id, msg.time];
				var sql = 'INSERT INTO msg_time (msg_id,time) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			},
			function(result, filed, callback) {
				//存user_id
				var value = [msg.id, msg.user_id];
				var sql = 'INSERT INTO msg_user (msg_id,user_id) VALUES (?,?);';
				connection.query(sql, value, function(err, result, filed) {
					callback(err, result, filed);
				});
			}
		], function(err, result, filed) {
			if (err) {
				cb(err);
				return;
			}
			if (cb) {
				cb(null, msg);
			}
		});
	} else {
		var err = new Error('user_id text room_id');
		cb(err);
	}
}

function _add(table) {
	var args = _slice(arguments, 1);
	switch (table) {
		case 'room':
			_add_room.apply(null, args);
			break;
		case 'user':
			_add_user.apply(null, args);
			break;
		case 'msg':
			_add_msg.apply(null, args);
			break;
	}
}
/*=====  End of add  ======*/



/*=============================================
=            update            =
=============================================*/

function _update_room(room, cb) {
	if (room.id) {
		async.series([
			function(callback) {
				//改 name
				if (room.name) {
					var value = [room.name, room.id];
					var sql = 'UPDATE room_name SET name=? WHERE room_id=?;';
					connection.query(sql, value, callback);
				}
			},
		], function(err, results) {
			if (err) {
				cb(err);
				return
			}
			if (cb) {
				cb(null, room);
			}
		});
	} else {
		var err = new Error('id underfined');
		cb(err);
	}
}

function _update_user(user, cb) {
	if (user.id) {
		async.series([
			function(callback) {
				//改 age
				if (user.age) {
					var value = [user.age, user.id];
					var sql = 'UPDATE user_age SET name=? WHERE user_id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			},
			function(callback) {
				//改 alias
				if (user.alias) {
					var value = [user.alias, user.id];
					var sql = 'UPDATE user_alias SET alias=? WHERE user_id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			},
			function(callback) {
				//改 password
				if (user.password) {
					var value = [user.password, user.id];
					var sql = 'UPDATE user_name_password SET password=? WHERE id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			},
			function(callback) {
				//改 room_id
				if (user.room_id) {
					var value = [user.room_id, user.id];
					var sql = 'UPDATE user_room SET room_id=? WHERE user_id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			},
			function(callback) {
				//改 sex
				if (user.sex) {
					var value = [user.sex, user.id];
					var sql = 'UPDATE user_sex SET sex=? WHERE user_id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			},
			function(callback) {
				//改 enroll_time
				if (user.enroll_time) {
					var value = [user.enroll_time, user.id];
					var sql = 'UPDATE user_enroll_time SET time=? WHERE user_id=?;';
					connection.query(sql, value, callback);
				} else {
					callback(null, null, null);
				}
			}
		], function(err, result) {
			if (err) {
				cb(err);
				return
			}
			cb(null, user);
		});
	} else {
		var err = new Error('id underfined');
		cb(err);
	}
}

/**

	TODO:

 */

function _update_msg(msg, cb) {
	if (msg.id) {
		async.waterfall([
			function(callback) {

			},
			function(callback) {}
		], function(err) {
			if (err) {
				cb(err);
				return
			}
			cb(null, msg);
		});
	} else {
		var err = new Error('id underfined');
		cb(err);
	}
}

function _update(table) {
	var args = _slice(arguments, 1);
	switch (table) {
		case 'room':
			_update_room.apply(null, args);
			break;
		case 'user':
			_update_user.apply(null, args);
			break;
		case 'msg':
			_update_msg.apply(null, args);
			break;
	}
}

/*=====  update  ======*/


/*========================
=          End of  all            =
========================*/

function _all_user(cb) {
	async.waterfall([
		function(callback) {
			var sql = ' SELECT user_name_password.*, user_age.age, user_sex.sex, user_alias.alias, user_login_time.time AS login_time, user_enroll_time.time AS enroll_time, user_room.room_id FROM  (user_room INNER JOIN (user_name_password INNER JOIN  (user_age INNER JOIN  (user_sex INNER JOIN  (user_alias INNER JOIN  (user_login_time INNER JOIN  user_enroll_time ON user_enroll_time.user_id=user_login_time.user_id) ON user_alias.user_id=user_login_time.user_id) ON user_alias.user_id=user_sex.user_id) ON user_age.user_id=user_sex.user_id)  ON user_name_password.id=user_age.user_id) ON user_room.user_id=user_name_password.id);';
			connection.query(sql, callback);
		},
		function(result, field, callback) {
			var users = [];
			result.forEach(function(item) {
				var u = new m.User().init(item);
				users.push(u);
			});
			callback(null, users);
		}
	], function(err, users) {
		if (cb) {
			if (err) {
				cb(err);
				return
			}
			cb(null, users);
		}
	});
}

function _all_room(cb) { 
	async.waterfall([
		function(callback) {
			var sql = 'SELECT' +
				' room_space.id,' +
				' room_space.space,' +
				' room_name.name,' +
				' room_create_time.time' +
				' FROM' +
				' (room_space INNER JOIN' +
				' (room_name INNER JOIN room_create_time ' +
				' ON room_name.room_id=room_create_time.room_id)' +
				' ON room_space.id=room_name.room_id);';
			connection.query(sql, callback);
		},
		function(result, field, callback) {
			try {
				var rooms = [];
				result.forEach(function(item) {
					var r = new m.Room().init(item);
					rooms.push(r);
				});
				callback(null, rooms);
			} catch (err) {
				callback(err);
			}
		}
	], function(err, rooms) {
		if (cb) {
			if (err) {
				cb(err);
				return
			}
			cb(null, rooms);
		}
	});
}

function _all_msg(cb) {
	async.waterfall([
		function(callback) {
			var sql = ' SELECT msg_text.id, msg_room.room_id, msg_text.text, msg_time.time, room_space.space, user_name_password.`name` FROM (user_name_password INNER JOIN (room_space INNER JOIN (msg_room INNER JOIN  (msg_text INNER JOIN  (msg_time INNER JOIN msg_user  ON msg_time.msg_id=msg_user.msg_id) ON msg_text.id=msg_time.msg_id) ON msg_room.msg_id=msg_text.id) ON msg_room.room_id=room_space.id) ON user_name_password.id=msg_user.user_id)';
			connection.query(sql, callback);
		},
		function(result, field, callback) {
			var msgs = [];
			result.forEach(function(item) {
				var u = new m.Msg().init(item);
				msgs.push(u);
			});
			callback(null, msgs);
		}
	], function(err, msgs) {
		if (cb) {
			if (err) {
				cb(err);
				return
			}
			cb(null, msgs);
		}
	});
}

function _all(table) {
	var args = _slice(arguments, 1);
	switch (table) {
		case 'room':
			_all_room.apply(null, args);
			break;
		case 'user':
			_all_user.apply(null, args);
			break;
		case 'msg':
			_all_msg.apply(null, args);
			break;
		default:
			throw "table";
			break;
	}
}

/*=====  End of all  ======*/


/**

	TODO:

 */

// exports.clean = _clean_;
// exports.delete = _delete;
exports.add = _add;
// exports.save = _save;
// exports.select = _select;
exports.update = _update;
exports.all = _all;

/*=============================================
=            Section tools            =
=============================================*/

function _slice(obj, index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}

/*=====  End of Section tools  ======*/