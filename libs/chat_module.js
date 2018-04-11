function _Msg(id,text,user_id,time,room_id) {
	this.text = text || '';
	this.user_id = user_id || '';
	this.time = time || '';
	this.room_id = room_id || '';
	this.id = id;
}
function _User(id,name,password,socket_id,room_id) {
	this.socket_id = socket_id;
	this.name = name;
	this.room_id = room_id; 
	this.password = password;
	this.id = id;
}
function Room(id,name,space) {
	this.id = id;
	this.name = name;
	this.space = space || '/';
	this.size = 0;
	this.maxsize = 10;
	this.users = [];
}
exports.Msg = _Msg;
exports.User = _User;
exports.Room = Room;