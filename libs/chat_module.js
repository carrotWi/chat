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
exports.Msg = _Msg;
exports.User = _User;
	