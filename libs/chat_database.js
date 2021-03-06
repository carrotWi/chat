const chat_mysql = require('./chat_mysql.js');
const async = require('async');
const tools = require('../tools/index.js');
module.exports = function() {

	function verify(obj, cb) {
		try {
			//校验用户名是否存在
			if (obj.name) {
				has_user_name(obj, cb);
			}
			//检验房间是否存在
			if (obj.space) {
				has_room(obj, cb);
			}

		} catch (err) {
			cb && cb(err);
		}
	}

	function try_login(obj, cb) {
		//尝试登陆
		if (obj.name && obj.password) {
			has_user_name_password(obj, cb);
		} else {
			var err = new Error('name or password');
			cb(err);
		}
	}

	function has_room(obj, cb) {
		async.waterfall([
			function(callback) {
				chat_mysql.all('room', callback);
			},
			function(rooms, callback) {
				tools('filter', rooms, function(room) {
					return (room.space === obj.space);
				}, callback);
			},
			function(rooms, callback) {
				if (rooms.length) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			}
		], function(err, result) {
			if (err) {
				cb && cb(err)
			} else {
				cb(null, result);
			}
		});
	}

	function has_user_name(obj, cb) {
		async.waterfall([
			function(callback) {
				chat_mysql.all('user', callback);
			},
			function(users, callback) {
				tools('filter', users, function(user) {
					return (user.name === obj.name);
				}, callback);
			},
			function(users, callback) {
				if (users.length) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			}
		], function(err, result) {
			if (err) {
				cb && cb(err)
			} else {
				cb(null, result);
			}
		});
	}

	/**
	
		TODO:
		- 实现添加房间信息
		- 用async
		- 少加一个字段
	
	 */
	function add_room(opt, cb) {
		async.waterfall([
			function(callback) {
				has_room(opt, callback);
			},
			function(result, callback) {
				//不存在才能添加
				if (!result) {
					chat_mysql.add('room', opt, function(err, room) {
						//这个结果是成功添加
						var result = true;
						callback(err, result, room);
					});
				} else {
					callback(null, result);
				}
			}
		], function(err, result, room) {
			if (cb) {
				if (err) {
					cb(err);
					return
				}
				cb(null, result, room);
			}
		});
	}

	function has_user_name_password(obj, cb) {
		async.waterfall([
			function(callback) {
				chat_mysql.all('user', callback);
			},
			function(users, callback) {
				tools('filter', users, function(user) {
					return (user.name === obj.name) && (user.password === obj.password);
				}, callback);
			},
			function(users, callback) {
				if (users.length) {
					var user = users[0];
					callback(null, true, user);
				} else {
					callback(null, false, null);
				}
			}
		], function(err, result, user) {
			if (err) {
				cb && cb(err)
			} else {
				cb(null, result, user);
			}
		});
	}

	function find_users(opt, cb) {
		try {
			async.waterfall([
				function(callback) {
					chat_mysql.all('user', callback);
				},
				function(users, callback) {
					tools('filter', users, function(u) {
						return _has(opt, u);
					}, callback);
				}
			], function(err, users) {
				if (err) {
					throw err;
					return
				}
				cb && cb(null, users);
			});
		} catch (err) {
			cb && cb(err);
			return;
		}
	}

	function _has(opt, obj) {
		var result = false;
		Object.keys(obj).forEach(function(key) {
			if (opt[key]) {
				result = result || (opt[key] === obj[key]);
			}
		});
		return result;
	}

	function find_rooms(opt, cb) {
		try {
			if (!opt.room_id && !opt.space) {
				throw 'room_id || space';
				return;
			}
			async.waterfall([
				function(callback) {
					chat_mysql.all('room', callback);
				},
				function(rooms, callback) {
					tools('filter', rooms, function(room) {
						var result = (room.id === opt.room_id) || (room.space === opt.space)
						return result;
					}, callback)
				}
			], function(err, rooms) {
				if (err) {
					throw err;
					return
				}
				cb && cb(null, rooms);
			});
		} catch (err) {
			cb(err);
			return;
		}
	}

	function find_msgs(opt, cb) {
		try {
			async.waterfall([
				function(callback) {
					chat_mysql.all('msg', callback);
				},
				function(msgs, callback) {
					tools('filter', msgs, function(msg) {
						return msg.room_id === opt.id;
					}, callback)
				}
			], function(err, msgs) {
				if (err) {
					throw err;
					return
				}
				cb && cb(null, msgs);
			});
		} catch (err) {
			cb && cb(err);
			return
		}
	}

	function find_msg_imgs(opt, cb) {
		async.waterfall([
			function(callback) {
				chat_mysql.all('msg_img', callback);
			},
			function(imgs, callback) {
				//用用async的过滤器 filter()
				async.filter(imgs, function(img, callback) {
					var result = true;
					callback(null, result);
				}, function(err, imgs) {
					if (err) {
						cb(err);
					} else {
						callback(null, imgs);
					}
				});
			}
		], function(err, imgs) {
			if (err) {
				cb(err);
			} else {
				cb(null, imgs);
			}
		});
	}

	function find_files(opt, cb) {
		async.waterfall([
			function(callback) {
				chat_mysql.all('file', callback);
			},
			function(files, callback) {
				//用用async的过滤器 filter()
				//屈辱的印记
				// async.filter(files, function(file, callback) {
				// 	// var result = opt.space ? (opt.id === file.room_id) : (opt.id === file.user_id);
				// 	// callback(null, !!result);
				// 	_filter_(opt, file, callback);
				// }, function(err, files) {
				// 	if (err) {
				// 		callback(err);
				// 	} else {
				// 		callback(null, files);
				// 	}
				// });
				try {
					files = files.filter(function(file) {
						var result = opt.space ? (opt.id === file.room_id) : (opt.id === file.user_id);
						return result
					});
					callback(null, files);
				} catch (err) {
					callback(err);
				}

			}
		], function(err, files) {
			if (err) {
				cb(err);
			} else {
				cb(null, files);
			}
		});
	}

	function _filter_(opt, file, callback) {
		opt.filter(function(item) {
			var result = opt.space ? (opt.id === file.room_id) : (opt.id === file.user_id);
		});
	}

	function find(table) {
		var arg = _slice(arguments, 1);
		switch (table) {
			case 'rooms':
				find_rooms.apply(null, arg);
				break;
			case 'users':
				find_users.apply(null, arg);
				break;
			case 'msgs':
				find_msgs.apply(null, arg);
				break;
			case 'msg_imgs':
				find_msg_imgs.apply(null, arg);
				break;
			case 'files':
				find_files.apply(null, arg);
				break;
			default:
				throw 'not table';
				break;
		}
	}

	//涉及到用户和房间的表
	function _switch_room(opt, cb) {
		try {
			async.waterfall([
				function(callback) {
					chat_mysql.update('user', opt, callback);
				}
			], function(err, user) {
				if (err) {
					cb(err);
					return;
				}
				cb && cb(null, user);
			});
		} catch (err) {
			cb && cb(err);
		}
	}

	function _add_msg_img(img, fn) {
		async.waterfall([
			function(callback) {
				chat_mysql.add('msg_img', img, callback);
			}
		], function(err, img) {
			if (err) {
				fn(err);
			} else {
				fn(null, img);
			}
		});
	}

	function _add_file(file, fn) {
		async.waterfall([
			function(callback) {
				chat_mysql.add('file', file, callback);
			}
		], function(err, file) {
			if (err) {
				fn(err);
			} else {
				fn(null, file);
			}
		});
	}

	return {
		verify: verify,
		find: find,
		login: try_login,
		add_room: add_room,
		switch_room: _switch_room,
		add_msg_img: _add_msg_img,
		add_file : _add_file,
	}
}();

function _slice(obj, index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}