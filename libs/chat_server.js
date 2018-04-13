var socketio = require('socket.io');
var chat_cache_database = require('./chat_cache_database.js');
var async = require('async');
var tools = require('../tools/index.js')
var m = require('../libs/chat_module.js')
var io;
var public_room;
module.exports = function (server) {
	io = socketio.listen(server);

	/*
		服务器打开
			初始化一个房间 --> name : public
	 */
	function get_id() {
		var date = new Date().getTime();
		var hash = Math.floor(Math.random() * 10) * 17;
		return hash + date;
	}
	var rooms_public = new m.Room(get_id(),'公共','/public');
	var rooms_test = new m.Room(get_id(),'test','/test');
	chat_cache_database.add('rooms',[rooms_public],function (err,room) {
		debugger
		public_room = room;
	});
	chat_cache_database.add('rooms',[rooms_test],function (err,room) {
		debugger
	});
	// id count name
	 // chat_cache_database.add(1,0,'public');
	 io.on('connection',function (socket) {
	 	//id name
	 	//var user = chat_cache_database.add('users',socket.id,socket.id);
	 	//加入一个房间
	 	// _join_room(socket,user);
	 	//把房间历史记录发给这个用户
	 	_history_room(socket);
	 	//游客进入
	 	_join_room(socket);
	 	//登录的监听器
	 	handle_login_success(socket);
	 	//这个游客离开了
	 	socket.on('disconnect',function () {
	 		console.log('这个游客离开了'.red);
	 	});
	 });

	 //创建一个房间的监听器
	 function _create_room_handle(socket) {
	 	socket.on('create_room',function (name) {
	 		async.waterfall([
	 				function (callback) {
	 					var space = '/' + name;
	 					var r = new m.Room(get_id(),name,space);
	 					chat_cache_database.add('rooms',r,function (err,room) {
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
	 function _disconnect_handle(socket,user) {
	 	//缓存中删除这个用户
	 	var opt = {
	 		'socket_id' : socket.id,
	 	}
	 	chat_cache_database.delete('users',opt,function (err,result) {
	 		//告诉所有人这个用户离线了
	 		socket.broadcast.emit('quit_user',user);
	 	});
	 	
	 }
	 function handle_login_success(socket) {
	 	//user-->json
	 	socket.on('login_success',function (user) {
	 		//创建一个房间的监听器
	 		_create_room_handle(socket);
	 		//发送房间列表
	 		_send_rooms_list(socket);
	 		//转发这个用户的消息
	 		handle_msg(socket);	 	
	 		var u = new m.User(get_id(),user.name,user.password,socket.id,public_room.id);	
	 		chat_cache_database.add('users',u,function (err,user) {
	 			if (err) {
	 				throw err;
	 			}
	 			//用户进入了房间
	 			_join_room(socket,user);
	 		});
	 		//这个用户离开了
	 		socket.on('disconnect',function () {
	 			_disconnect_handle(socket,user);
	 		});
	 	});
	 }
	 function _history_room(socket) {
	 	var opt = {
	 		'socket_id' : socket.id,
	 	}
	 	chat_cache_database.select('users',opt,function (err,users) {
	 		//已经登录的用户
	 		if (users.length) {
	 			async.waterfall([
	 					function (callback) {
	 							//通过socket.id拿users
	 							var opt = {
	 								'socket_id' : socket.id ,
	 							}
	 							chat_cache_database.select('users',opt,function (err,users) {
	 								callback(err,users);
	 							});
	 					},
	 					function (user,callback) {
	 						//通过users拿到rooms
	 						if (users.length) {
	 							var opt = {
	 								'id' : users[0].room_id,
	 							}
	 							chat_cache_database.select('rooms',opt,function (err,rooms) {
	 								callback(err,rooms);
	 							});
	 						}else{
	 							callback(null,[]);
	 						}
	 					},
	 					function (rooms,callback) {
	 						if (rooms.length) {
	 							//通过room拿到msg_list
	 							var opt = {
	 								'room_id' : rooms[0].id,
	 							};
	 							chat_cache_database.select('msg',opt,function (err,msg_list) {
	 								callback(err,msg_list);
	 							});
	 						}else{
	 							callback(null,[]);
	 						}
	 					}
	 				],function (err,result) {
	 				if (err) {
	 					throw err;
	 				}
	 				socket.emit('msg_list',result);
	 			});
	 		}else{
	 			//游客
	 			async.waterfall([
	 				function (callback) {
	 					//找到消息列
	 					var opt = {
	 						'room_id' : public_room.id,
	 					}
	 					chat_cache_database.select('msgs',opt,function (err,msg_list) {
	 						callback(err,msg_list);
	 					});
	 				},
	 				function (msg_list,callback) {
	 					//并表 用户id 对应用户
	 					var opt = {
	 						'id' : msg.user_id,
	 					};
	 					tools('map',msg_list,function (msg) {
	 						chat_cache_database.select('users',opt,function (err,user) {
	 							msg.user_name = user.name;
	 						});
	 					},function (err,result) {
	 						callback(err,result);
	 					});
	 				},
	 				function (msg_list,callback) {
	 					//过滤同一个聊天室的信息
	 					//默认的房间
	 					tools('filter',msg_list,function (msg) {
	 						return msg.room_id === public_room.id;
	 					},function (err,result) {
	 						callback(err,result);
	 					});
	 				}
	 				],function (err,result) {
	 					if (err) {
	 						throw err;
	 					}
	 					socket.emit('msg_list',result);
	 			});
	 		}
	 	});
	 }
	function _join_room(socket,user,space) {
		//把用户信息发给全体用户
		if (user) {
			_broadcast_user(socket,user,space);
		}
		//把所有用户信息发给这个用户 emit--> user_list
		var user_list = chat_cache_database.all('users',function (err,user_list) {
			socket.emit('user_list',user_list);
		});
	}
	 function _broadcast_user(socket,user,space) {
	 	// socket.emit('new_user',user);
	 	if (space) {
	 		socket.broadcast.to(space).emit('new_user',user);
	 	}else{
	 		// debugger
	 		socket.broadcast.emit('new_user',user);
	 	}
	 	socket.emit('new_user',user);
	 }
	 //转发给 同一个 聊天室
	 function handle_msg(socket) {
	 	socket.on('msg',function (context,room_id) {
	 		async.waterfall([
	 				function (callback) {
	 					//找到这个用户
	 					var opt = {
	 						'socket_id' : socket.id,
	 					};
	 					chat_cache_database.select('users',opt,function (err,users) {
	 						callback(err,users);
	 					});
	 				},
	 				function (users,callback) {
	 					//找到这个房间
	 					var user = users[0];
	 					var opt = {
	 						'id' : user.room_id,
	 					};
	 					chat_cache_database.select('rooms',opt,function (err,rooms) {
	 						var room = rooms[0];
	 						callback(err,user,room);
	 					});
	 					//缓存这条消息
	 					//id,text,user_id,time,room_id
	 				},
	 				function (user,room,callback) {
	 					var time = new Date().getTime();
	 					var m = new m.Msg(get_id(),context,user.id,time,room.id);
	 					chat_cache_database.add('msgs',m,function (err,msgs) {
	 						var msg = msgs[0];
	 						callback(err,msg);
	 					});
	 				}
	 			],function (err,msg) {
	 			if (err) {
	 				throw err;
	 			}
	 			//发送
	 			socket.broadcast.emit('msg',msg);
	 		});
	 	});
	 }
}
function _get_name() {
	return new Date().getTime() + 17 * Math.floor(Math.random() * 10);
}
//并表
//两张表,两个主键
//显示第一张表
// function _join_(table1,key1,table2,key2,callback) {
// 	async.parallel([
// 			function (callback) {
// 				//拿到表1
// 				chat_cache_database.select(table1,'id',key1,function (err,result) {
// 					callback(err,result);
// 				});
// 			},
// 			function (callback) {
// 				//拿到表2
// 				chat_cache_database.select(table2,'id',key2,function (err,result) {
// 					callback(err,result);
// 				});
// 			}
// 		],function (err,result) {
// 			//并表
// 			result[0].user_name = result[1].name;
// 			callback(null,result[0]);
// 	});
// }

