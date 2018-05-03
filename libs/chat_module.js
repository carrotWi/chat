function _Msg() {
	this.text;
	this.user_id;
	this.time = format_time(new Date());
	this.room_id;
	this.room_space;
	this.id;
}
_Msg.prototype.init = function(opt) {
	for (var key in opt) {
		if (opt.hasOwnProperty(key)) {
			this[key] = opt[key];
		}
	}
	return this;
}

function format_time(date) {
	date = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDay(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
	}
	var left = [date.year, date.month, date.day];
	var right = [date.hours, date.minutes, date.seconds];
	var all = [left.join('-'), right.join(':')];
	var str = all.join(' ');
	return str;
};

function _User() {
	this.socket_id;
	this.name;
	this.room_id;
	this.password;
	this.time = format_time(new Date());
	this.alias;
	this.id;
}
_User.prototype.init = function(opt) {
	for (var key in opt) {
		if (opt.hasOwnProperty(key)) {
			this[key] = opt[key];
		}
	}
	return this;
}

function _Room() {
	this.id;
	this.name;
	this.space;
	this.size = 0;
	this.maxsize = 10;
	this.time = format_time(new Date());
}
_Room.prototype.init = function(opt) {
	for (var key in opt) {
		if (opt.hasOwnProperty(key)) {
			this[key] = opt[key];
		}
	}
	return this;
}
exports.Msg = _Msg;
exports.User = _User;
exports.Room = _Room;