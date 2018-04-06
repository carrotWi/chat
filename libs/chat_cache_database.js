var module = require('./chat_module.js');
var cache_database = {
	rooms : [],
	users : [], 
	msgs : [],
}
function _add_user(id,name) {
	var users = cache_database.users;
	var user = new module.User(id,name);
	users.push(user);
	return user;
}
function _add_msg(text,username,time,room) {
	var msgs = cache_database.msgs;
	var msg = new module.Msg(text,username,time,room);
	msgs.push(msg);
	return msg;
}
function _add_room(id,count,name) {
	var rooms = cache_database.rooms;
	var room = {
		id : id,
		count : count,
		name : name,
	};
	rooms.push(room);
	return room;
}
function _add(table) {
	var result;
	var args = _slice(arguments,1);
	switch(table) {
		case 'rooms':
			 result = _add_room.apply(null,args);
			break;
		case 'users':
			 result = _add_user.apply(null,args);
			break;
		case 'msgs':
			 result = _add_msg.apply(null,args);
			break;
	}
	return result;
}
function _select_user(okey,ovalue) {
	var users = cache_database.users;
	var result = [];
	for(var user of users){
		if(user[okey] === ovalue && okey != undefined){
			result.push(user);
		}
	}
	return result;
}
function _select(table) {
	var result;
	var args = _slice(arguments,1);
	switch(table) {
		// case 'rooms':
		// 	_add_room.apply(null,args);
		// 	break;
		case 'users':
			result =  _select_user.apply(null,args);
			break;
	}
	return result;
}
function _slice(obj,index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}
function _delete_user(okey,ovalue) {
	var user = _select_user(okey,ovalue)[0];
	var users = cache_database.users;
	if (!user) {
		return false;
	}
	cache_database.users = _delete_arr(users,user);
	return true;
}
function _delete_arr(arr,obj) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		var user = arr[i];
		if (obj.id !== user.id) {
			result.push(user);
		}
	}
	return result
}
function _delete(table) {
	var result = false;
			var args = _slice(arguments,1);
			switch(table) {
				// case 'rooms':
				// 	_add_room.apply(null,args);
				// 	break;
				case 'users':
					result =  _delete_user.apply(null,args);
					break;
			}
			return result;
}
function _all_users() {
	return cache_database.users;
}
function _all_msgs() {
	return cache_database.msgs;
}
function _all(table) {
	var result;
			var args = _slice(arguments,1);
			switch(table) {
				// case 'rooms':
				// 	_add_room.apply(null,args);
				// 	break;
				case 'users':
					result =  _all_users.apply(null,args);
					break;
				case 'msgs':
					 result = _all_msgs.apply(null,args);
					break;
			}
			return result;
}
exports.all = _all;
exports.delete = _delete;
exports.add = _add;
exports.select = _select;