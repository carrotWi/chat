var chat_database = require('./chat_database.js');
// chat_database = chat_database();
const socketio = require('socket.io');
const chat_mysql = require('./chat_mysql.js');
const async = require('async');
const tools = require('../tools/index.js')
const m = require('../libs/chat_module.js')
var io;
//在线的用户
const socket_user = {};
//在线的房间
const socket_room = {};

const public_room = new m.Room().init({
	name: '公共',
	space: '/public',
	id: 54,
});
//程序入口
module.exports = function(server) {
	io = socketio.listen(server);
	/*
		服务器打开
			初始化一个房间 --> name : public
	 */
	io.on('connection', function(socket) {
		//游客进入
		_join_room(socket, public_room);
		//登录的监听器
		_login_success_handle(socket);
		//这个游客离开了
		socket.on('disconnect', function() {
			_delete_user(socket);
			_delete_room(socket);
		});
	});
}

function _delete_user(socket) {
	delete socket_user[socket.id];
}

function _delete_room(socket) {
	delete socket_room[socket.id];
}

function _send_rooms_list(socket) {
	//发送房间列表
	//还需要用户所在的房间
	var rooms = chat_mysql.all('room', function(err, rooms) {
		if (err) {
			throw err;
		}
		var data = rooms;
		socket.emit('room_list', data);
	});
}

//切换房间监听器
function _switch_room_handle(socket) {
	socket.on('switch_room', function(opt) {
		/**
		
			TODO:
			- 拿到房间
			- 更新数据库
			 - 更改 user 的 room_id 字段
			- 刷新聊天室
				- 刷新用户列表
				- 刷新聊天室内容列表
				
		 */

		async.waterfall([
			function(callback) {
				//拿到想要切换的房间
				chat_database.find('rooms', opt, callback);
			},
			function(rooms, callback) {
				try {
					var room = rooms[0];
					debugger
					//保存现在的房间
					_save_room(socket, room);
					var user = socket_user[socket.id];
					user.room_id = room.id;
					//更新数据库
					chat_database.switch_room(user, function(err, user) {
						if (err) {
							callback(err);
							return;
						}
						callback(null, room);
					});
				} catch (err) {
					callback(err);
				}
			}
		], function(err, room) {
			if (err) {
				throw err;
				return;
			}
			_refresh(socket, room);
		});
	});
}

/**

	TODO:
	- 刷新用户列表
	- 刷行聊天信息

 */

function _refresh(socket, room) {
	//并发
	debugger
	_history_room(socket, room);
}

//登陆成功监听器
function _login_success_handle(socket) {
	//user-->json
	socket.on('login_success', function(user) {
		var user = new m.User().init(user);
		//换房间的监听器
		_switch_room_handle(socket);
		//重新加载房间列表的监听器
		_reload_all_user_room_list_handle(socket);
		//发送房间列表
		_send_rooms_list(socket);
		//转发这个用户的消息
		handle_msg(socket);
		//在数据库找到这个用户
		chat_database.find('users', user, function(err, users) {
			if (err) {
				throw err;
			}
			var user = users[0];
			/**
					
				TODO:
				- 用户最后一次登录房间
					
			 */

			//在服务器保存这个用户
			_save_user(socket, user);
			//加入房间
			/**
			
				TODO:
				- find room by user
				- call _join_room()
			
			 */
			async.waterfall([
				function(callback) {
					var opt = user;
					chat_database.find('rooms', opt, callback)
				}
			], function(err, rooms) {
				if (err) {
					throw err;
				}
				var room = rooms[0];
				//加入房间
				_join_room(socket, room, user);
				// 保存这个socket所在的房间
				_save_room(socket, room);
			});
			// _join_room(socket, public_room, user);

		});

		//这个用户离开了
		socket.on('disconnect', function() {

		});
	});
}

function _reload_all_user_room_list_handle(socket) {
	socket.on('reload_all_user_room_list', function() {
		//发送房间列表
		var rooms = chat_mysql.all('room', function(err, rooms) {
			if (err) {
				throw err;
			}
			io.sockets.emit('room_list', rooms);
		});
	});
}

function _save_room(socket, room) {
	socket_room[socket.id] = room;
}

function _history_room(socket, room) {
	// var room = socket_room[socket.id];
	//发送这个房间所有的msg
	chat_database.find('msgs', room, function(err, msgs) {
		if (err) {
			throw err;
			return;
		}
		socket.emit('msg_list', msgs);
	});
}

function _save_user(socket, user) {
	socket_user[socket.id] = user;
}

function _emit_online_user_list(socket, room) {
	/**
		
		TODO:
		- 拿到所有在线用户,将其转化为数组
		- 用给到的房间参数过滤
		
	 */
	async.waterfall([
		function(callback) {
			var arr = [];
			Object.keys(socket_user).forEach(function(key) {
				arr.push(socket_user[key]);
			});
			callback(null, arr);
		},
		function(arr, callback) {
			tools('filter', arr, function(user) {
				return user.room_id === room.id;
			}, callback)
		}
	], function(err, result) {
		if (err) {
			throw err;
		}
		socket.emit('online_user_list', result);
	});
}

//游客进入直有前两个参数
function _join_room(socket, room, user) {
	//socket 加入这个 space
	socket.join(room.space);
	//把房间历史记录发给这个用户
	_history_room(socket, room);
	//把所有用户信息发给这个用户 emit--> user_list
	var user_list = chat_mysql.all('user', function(err, user_list) {
		socket.emit('user_list', user_list);
		//发送在线的用户
		_emit_online_user_list(socket, room);
	});
	//把用户信息发给全体用户
	if (user) {
		_broadcast_user(socket, user, room);
	}
}

function _broadcast_user(socket, user, room) {
	// socket.emit('new_user',user);
	if (room.space) {
		socket.broadcast.to(room.space).emit('new_user', user);
	} else {
		socket.broadcast.to('/public').emit('new_user', user);
	}
	socket.emit('new_user', user);
}
//转发给 同一个 聊天室
function handle_msg(socket) {
	socket.on('msg', function(msg) {
		//找到msg.room_id 关联的 room
		async.waterfall([
			function(callback) {
				try {
					var user = socket_user[socket.id];
					var room = socket_room[socket.id];
					var msg1 = new m.Msg().init({
						user_id: user.id,
						text: msg.text,
						room_id: room.id,
					});
					callback(null, msg1, user);
				} catch (err) {
					callback(err);
				}
			},
			function(msg1, user, callback) {
				var opt = msg1;
				chat_mysql.add('msg', opt, function(err, msg) {
					callback(err, msg, user);
				});
			},
			function(msg2, user, callback) {
				var opt = msg2;
				chat_database.find('rooms', opt, function(err, rooms) {
					var room = rooms[0];
					callback(err, room, msg, user);
				});
			},
			function(room, msg3, user, callback) {
				//组装
				msg3.name = user.name;
				msg3.room = room;
				callback(null, msg3)
			}
		], function(err, result) {
			if (err) {
				throw err;
				return;
			}
			var msg = result;
			var space = result.room.space;
			socket.broadcast.to(space).emit('msg', msg);
		});
	});
}