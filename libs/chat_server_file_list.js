const async = require('async');
const chat_database = require('./chat_database.js');

module.exports = function(socket, user, room) {
	//发送文件列表
	function _emit_file_list(callback) {

		async.waterfall([
			function(callback) {
				//同一个房间
				chat_database.find('files', room, callback);
			}
		], function(err, files) {
			if (err) {
				callback(err);
			} else {
				socket.emit('file_list', files);
				callback(null);
			}
		});


	}

	return {
		emit_file_list : _emit_file_list,
	}
}

