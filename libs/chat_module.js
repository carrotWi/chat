
	function _Msg(text,username,time,room) {
	this.text = text || '';
	this.username = username || '';
	this.time = time || '';
	this.room = room || '';
}

	function _User(id,name) {
		this.id = id;
		this.name = name;
}

exports.Msg = _Msg;
exports.User = _User;
	