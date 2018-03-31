var module = function () {
	function _Msg(text,name,time,room) {
	this.text = text;
	this.name = name;
	this.time = time;
	this.room = room;
}

	function _User(id,name) {
		this.id = id;
		this.name = name;
}

	return {
		Msg : _Msg,
		User : _User,
	}
}();