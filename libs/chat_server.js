var chat_database = require('./chat_database.js');
chat_database = chat_database();
var socketio = require('socket.io');
var chat_cache_database = require('./chat_cache_database.js');
var async = require('async');
var tools = require('../tools/index.js')
var m = require('../libs/chat_module.js')
var io;
var socket_user = {};
var socket_room = {};
var public_room = new m.Room().init({
		name : '公共',
		space : '/public',
		id : 54,
	});
module.exports = function (server) {
	io = socketio.listen(server);

	/*
		服务器打开
			初始化一个房间 --> name : public
	 */
	 io.on('connection',function (socket) {
	 	//游客进入
	 	_join_room(socket,public_room);
	 	//登录的监听器
	 	handle_login_success(socket);
	 	//这个游客离开了
	 	socket.on('disconnect',function () {
	 		console.log('这个游客离开了'.red);
	 	});
	 });
}
	 //创建一个房间的监听器
	 function _create_room_handle(socket) {
	 	socket.on('create_room',function (name) {
	 		async.waterfall([
	 				function (callback) {
	 					var space = '/' + name;
	 					var r = new m.Room();
	 					chat_cache_database.add('rooms',[r],function (err,room) {
	 						callback(err,room);
	 					});
	 				},
	 			],function (err,result) {
	 			if (err) {
	 				throw err;
	 			}
	 		});
	 	});
	 }

	 function _send_rooms_list(socket) {
	 	//发送房间列表
	 	var rooms = chat_cache_database.all('rooms',function (err,rooms) {
	 		socket.emit('room_list',rooms);
	 	});
	 }
	 // function _disconnect_handle(socket,user) {
	 	//缓存中删除这个用户
	 	
	 
	 function handle_login_success(socket) {
	 	//user-->json
	 	socket.on('login_success',function (user) {
	 		var user = new m.User().init(user);
	 		//保存这个socket所在的房间
	 		socket_room[socket.id] = public_room;
	 		//创建一个房间的监听器
	 		_create_room_handle(socket);
	 		//发送房间列表
	 		_send_rooms_list(socket);
	 		//转发这个用户的消息
	 		handle_msg(socket);	 	
	 		//在数据库找到这个用户
	 		chat_database.find('users',user,function (err,users) {
	 			if (err) {
	 				throw err;
	 				return
	 			}
	 			//加入公共房间
	 			var user = users[0];
	 			//在服务器保存这个用户
	 			socket_user[socket.id] = user;
	 			_join_room(socket,public_room,user);
	 		});
	 			
	 		//这个用户离开了
	 		socket.on('disconnect',function () {
	 			// _disconnect_handle(socket,user);
	 		});
	 	});
	 }
	 function _history_room(socket,room) {
	 	//发送这个房间所有的msg
	 	chat_database.find('msgs',room,function (err,msgs) {
	 		if (err) {
	 			throw err;
	 			return;
	 		}
	 		socket.emit('msg_list',msgs);
	 	});
	 }
	function _join_room(socket,room,user) {
		//socket 加入这个room
		socket.join(room.space);
		//把房间历史记录发给这个用户
	 	_history_room(socket,room);
	 	//把所有用户信息发给这个用户 emit--> user_list
	 	var user_list = chat_cache_database.all('users',function (err,user_list) {
	 		socket.emit('user_list',user_list);
	 	});
		//把用户信息发给全体用户
		if (user) {
			_broadcast_user(socket,user,room);
		}
	}
	 function _broadcast_user(socket,user,room) {
	 	// socket.emit('new_user',user);
	 	if (room.space) {
	 		socket.broadcast.to(room.space).emit('new_user',user);
	 	}else{
	 		socket.broadcast.to('/public').emit('new_user',user);
	 	}
	 	socket.emit('new_user',user);
	 }
	 //转发给 同一个 聊天室
	 function handle_msg(socket) {
	 	socket.on('msg',function (msg) {
	 		//找到msg.room_id 关联的 room
	 		async.waterfall([
	 				function (callback) {
	 					try{
	 						var user = socket_user[socket.id];
	 						var room = socket_room[socket.id];
	 						var result = new m.Msg().init({
	 							user_id : user.id,
	 							text : msg.text,
	 							room_id : room.id,
	 						});
	 						callback(null,result,user);
	 					}catch(err){
	 						callback(err);
	 					}
	 				},
	 				function (opt,user,callback) {
	 					chat_cache_database.add('msg',opt,function (err,msg) {
	 						callback(err,msg,user);
	 					});
	 				},
	 				function (msg,user,callback) {
	 					var opt = msg;
	 					chat_database.find('rooms',opt,function (err,rooms) {
	 						var room = rooms[0];
	 						callback(err,room,msg,user);
	 					});
	 				},
	 				function (room,msg,user,callback) {
	 					//组装
	 					msg.name = user.name;
	 					msg.room = room;
	 					callback(null,msg)
	 				}
	 			],function (err,result) {
	 			if (err) {
	 				throw err;
	 				return ;
	 			}
	 			var msg = result;
	 			var space = result.room.space;
	 			socket.broadcast.to(space).emit('msg',msg);
	 		});
	 	});
	 }