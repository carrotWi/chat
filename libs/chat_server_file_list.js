module.exports = function(socket, user, room) {
	//发送文件列表
	emit_file_list(socket, user, room);
}

function emit_file_list(socket, user, room) {
	
	socket.broadcast.to(room.space).emit('file_list',);
}