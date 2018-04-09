function _Msg(text,name,time,room) {
	this.text = text || '';
	this.name = name || '';
	this.time = time || '';
	this.room = room || '';
}
function _User(id,name,password,socket) {
	this.id = id;
	this.name = name;
	this.password = password;
	this.socket = socket;
}
function Room(id,name) {
	this.id = id;
	this.name = name;
	this.size = 0;
	this.maxsize = 10;
}
exports.Msg = _Msg;
exports.User = _User;
exports.Room = Room;