var chat_cache_database = require('./chat_cache_database.js');
var async = require('async');
var tools = require('../tools/index.js');
module.exports = function () {
	
	function verify(obj,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_cache_database.all('user',callback);
					},
					function (users,callback) {
						tools('filter',users,function (user) {
							return (user.name===obj.name) && (user.password===obj.password);
						},callback);
					},
					function (users,callback) {
						if (users.length) {
							callback(null,true);
						} else {
							callback(null,false);
						}
					}
				],function (err,result) {
				if (err) {
					cb && cb(err)
				} else {
					cb(null,result);
				}
			});
		}catch(err){
			cb && cb(err);
		}
	}

	function find_users(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_cache_database.all('user',callback);
					},
					function (users,callback) {
						tools('filter',users,function (u) {
							return opt.name===u.name;
						},callback);
					}
				],function (err,users) {
				if (err) {
					throw err;
					return
				}
					cb && cb(null,users);
			});
		}catch(err){
			cb && cb(err);
			return;
		}
	}

	function find_rooms(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_cache_database.all('room',callback);
					},
					function (rooms,callback) {
						tools('filter',rooms,function (room) {
							return room.id===opt.room_id;
						},callback)
					}
				],function (err,rooms) {
					if (err) {
						throw err;
						return
					}
					cb && cb(null,rooms);
			});
		}catch(err){
			throw err;
			return ;
		}
	}

	function find_msgs(opt,cb) {
		try{
			async.waterfall([
					function (callback) {
						chat_cache_database.all('msg',callback);
					},
					function (msgs,callback) {
						tools('filter',msgs,function (room) {
							return room.id===opt.room_id;
						},callback)
					}
				],function (err,msgs) {
					if (err) {
						throw err;
						return
					}
					cb && cb(null,msgs);
			});
		}catch(err){
			cb && cb(err);
			return
		}
	}


	function find (table) {
		var arg = _slice(arguments,1);
		switch(table) {
			case 'rooms':
				find_rooms.apply(null,arg);
				break;
			case 'users':
				find_users.apply(null,arg);
				break;
			case 'msgs':
				find_msgs.apply(null,arg);
				break;
		}
	}

	return {
		verify : verify,
		find : find,
	}
}

function _slice(obj,index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}