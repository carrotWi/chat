var socketio = require('socket.io');
var chat_cache_database = require('./chat_cache_database.js');
var io;



module.exports = function (server) {
	io = socketio.listen(server);
	/*
		服务器打开
			初始化一个房间 --> name : public
	 */
	// id count name
	 // chat_cache_database.add(1,0,'public');

	 io.on('connection',function (socket) {
	 	//id name
	 	var user = chat_cache_database.add('users',socket.id,socket.id);
	 	//加入一个房间
	 	_join_room(socket,user);
	 	//把房间历史记录发给这个用户
	 	_history_room(socket);


	 	handle_msg(socket,socket.id);


	 	socket.on('disconnect',function () {
	 		_disconnect_handle(socket,user);
	 	});
	 });

	 function _disconnect_handle(socket,user) {
	 	//缓存中删除这个用户
	 	var result = chat_cache_database.delete('users','id',socket.id);
	 	console.log(chat_cache_database.all('users'));
	 	console.log(result);
	 	//告诉所有人这个用户离线了
	 	socket.broadcast.emit('quit_user',user);
	 	// console.log(chat_cache_database.all('users'));
	 }

	 function _history_room(socket) {
	 	var msg_list = chat_cache_database.all('msgs');
	 	socket.emit('msg_list',msg_list);
	 }

	function _join_room(socket,user) {
		//把用户名发给全体用户
		_broadcast_user(socket,user);
		//把所有用户发给这个用户 emit--> user_list
		var user_list = chat_cache_database.all('users');
		socket.emit('user_list',user_list);
	}


	 function _broadcast_user(socket,user) {
	 	// socket.emit('new_user',user);
	 	socket.broadcast.emit('new_user',user);
	 }

	 //转发给同一个聊天室
	 function handle_msg(socket) {
	 	socket.on('msg',function (msg) {
	 		var user_col = chat_cache_database.select('users','id',socket.id);
	 		var data = {
	 			msg : msg,
	 			name : user_col[0].name,
	 		};
	 		//text,username,time,room
	 		chat_cache_database.add('msgs',data.msg,data.name);
	 		console.log(data);
	 		socket.broadcast.emit('msg',data);
	 	});
	 }
}

function _get_name() {
	return new Date().getTime() + 17 * Math.floor(Math.random() * 10);
}




