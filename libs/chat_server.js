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
	 	// var user = chat_cache_database.add('users',socket.id,socket.id);
	 	//加入一个房间
	 	// _join_room(socket,user);
	 	//把房间历史记录发给这个用户
	 	_history_room(socket);
	 	//游客进入
	 	_join_room(socket);
	 	handle_login_success(socket);
	 	//这个游客离开了
	 	socket.on('disconnect',function () {
	 		console.log('这个游客离开了');
	 	});
	 });
	 function _disconnect_handle(socket,user) {
	 	//缓存中删除这个用户
	 	var result = chat_cache_database.delete('users','id',socket.id);
	 	//告诉所有人这个用户离线了
	 	socket.broadcast.emit('quit_user',user);
	 }
	 function handle_login_success(socket) {
	 	//user-->json
	 	socket.on('login_success',function (user) {
	 		//转发这个用户的消息
	 		handle_msg(socket);	 		
	 		var user = chat_cache_database.add('users',socket.id,user.name,user.password);
	 		//用户进入了房间
	 		_join_room(socket,user);
	 		//这个用户离开了
	 		socket.on('disconnect',function () {
	 			_disconnect_handle(socket,user);
	 		});
	 	});
	 }
	 function _history_room(socket) {
	 	var msg_list = chat_cache_database.all('msgs');
	 	socket.emit('msg_list',msg_list);
	 }
	function _join_room(socket,user) {
		//把用户信息发给全体用户
		if (user) {
			_broadcast_user(socket,user);
		}
		//把所有用户信息发给这个用户 emit--> user_list
		var user_list = chat_cache_database.all('users');
		socket.emit('user_list',user_list);
	}
	 function _broadcast_user(socket,user) {
	 	// socket.emit('new_user',user);
	 	socket.broadcast.emit('new_user',user);
	 	socket.emit('new_user',user);
	 }
	 //转发给同一个聊天室
	 function handle_msg(socket) {
	 	socket.on('msg',function (context) {

	 		var user_col = chat_cache_database.select('users','id',socket.id);
	 		//text,username,time,room
	 		var msg = chat_cache_database.add('msgs',context,user_col[0].name);
	 		socket.broadcast.emit('msg',msg);
	 	});
	 }
}
function _get_name() {
	return new Date().getTime() + 17 * Math.floor(Math.random() * 10);
}