var module = require('./chat_module.js');
var color = require('colors');
var mongodb = require('mongodb');
var async = require('async');
const url = 'mongodb://localhost:27017';
const dbName = 'test';
const DOCUMENT = ['rooms'];
const MongoClient = mongodb.MongoClient;
var cache_database = {
	rooms : [],
	users : [], 
	msgs : [],
}




function test_print() {
	Object.keys(cache_database).forEach(function (key) {
		console.log(key.red + ' : \n');
		var arr = cache_database[key];
		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];
			Object.keys(obj).forEach(function (ke) {
				console.log('\t' + ke + ' : ' + obj[ke] + '\n\n');
			});
		}
	});
}

function _add_user(id,name,password,socket_id,room_id,callback) {
		var users = cache_database.users;
		var user = new module.User(id,name,password,socket_id,room_id);
		users.push(user);
		if (callback) {
			callback(null,user);
		}
}
function _add_room(id,name,space,callback) {
		var rooms = cache_database.rooms;
		var room = new module.Room(id,name,space);
		rooms.push(room);
		if (callback) {
			callback(null,room);
		}
	
}
//id,text,user_id,time,room_id
function _add_msg(id,text,user_id,time,room_id,callback) {
		var msgs = cache_database.msgs;
		var msg = new module.Msg(id,text,user_id,time,room_id);
		msgs.push(msg);
		if (callback) {
			callback(null,msg);
		}
}

function _add(table) {
	var args = _slice(arguments,1);
	switch(table) {
		case 'rooms':
			_add_room.apply(null,args);
			break;
		case 'users':
			_add_user.apply(null,args);
			break;
		case 'msgs':
			_add_msg.apply(null,args);
			break;
	}
	test_print();
}
function _select_users(okey,ovalue,callback) {
		var users = cache_database.users;
		var result = [];
		for(var user of users){
			if(user[okey] === ovalue && okey != undefined){
				result.push(user);
			}
		}
		if (callback) {
			callback(null,result);
		}
	
}
function _select_msgs(okey,ovalue,callback) {
		var msgs = cache_database.msgs;
		var result = [];
		for(var msg of msgs){
			if(msg[okey] === ovalue && okey != undefined){
				result.push(msg);
			}
		}
		if (callback) {
			callback(null,result);
		}
	
}
function _select_rooms(okey,ovalue,callback) {
		var msgs = cache_database.rooms;
		var result = [];
		for(var msg of msgs){
			if(msg[okey] === ovalue && okey != undefined){
				result.push(msg);
			}
		}
		if (callback) {
			callback(null,result);
		}
}
function _select(table) {
	var args = _slice(arguments,1);
	switch(table) {
		case 'rooms':
			_select_rooms.apply(null,args);
			break;
		case 'msgs':
			_select_msgs.apply(null,args);
			break;
		case 'users':
			_select_users.apply(null,args);
			break;
	}
}
function _slice(obj,index) {
	var result = [];
	for (var i = index; i < obj.length; i++) {
		result.push(obj[i]);
	}
	return result;
}
function _delete_user(okey,ovalue,callback) {
	_select_users(okey,ovalue,function (err,users) {
			var arr = cache_database.users;
			cache_database.users = _delete_arr(arr,users[0]);
			if (callback) {
			 	callback(null);
			 } 
		
	})
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

			var args = _slice(arguments,1);
			switch(table) {
				case 'users':
				 _delete_user.apply(null,args);
					break;
			}

}
function _all_users(callback) {
	if (callback) {
		return callback(null,cache_database.users)
	}
}
function _all_msgs(callback) {
	if (callback) {
		return callback(null,cache_database.msgs)
	}
}
function _all_rooms(callback) {
	if (callback) {
		return callback(null,cache_database.rooms)
	}
}
function _all(table) {
			var args = _slice(arguments,1);
			switch(table) {
				case 'rooms':
					_all_rooms.apply(null,args);
					break;
				case 'users':
					_all_users.apply(null,args);
					break;
				case 'msgs':
					_all_msgs.apply(null,args);
					break;
			}
}

function _select_(table,opt,fn) {
	var args = _slice(arguments,1);
	async.waterfall([
			function (callback) {
				MongoClient.connect(url,function (err,client) {
					var db = client.db(dbName);
					callback(err,db);
				});
			},
			function (db,callback) {
				var collection = db.collection(table);
				collection.find(opt).toArray(function (err,result) {
					callback(err,result,db);
				});
			}
		],function (err,result,db) {
			if (err) {
				throw err;
			}
			fn(err,result);
			// db.close();

	});
}

function _add_(table,arr,fn) {
	var args = _slice(arguments,1);
	async.waterfall([
			function (callback) {
				MongoClient.connect(url,function (err,client) {
					var db = client.db(dbName);
					debugger
					callback(err,db);
				});
			},
			function (db,callback) {
				var collection = db.collection(table);
				collection.insertMany(arr,function (err,result) {
					debugger
					callback(err,result,db);
				});
			}
		],function (err,result,db) {
			if (err) {throw err;}
			fn(err,result);
			// db.close();		
	});
	
}

function _all_(table,fn) {
	var args = _slice(arguments,1);
	async.waterfall([
			function (callback) {
				MongoClient.connect(url,function (err,client) {
					var db = client.db(dbName);
					callback(err,db);
				});
			},
			function (db,callback) {
				var collection = db.collection(table);
				collection.find({}).toArray(function (err,result) {
					callback(err,result,db);
				});
			}
		],function (err,result,db) {
			if (err) {
				throw err;
			}
			fn(err,result);
			// db.close();
	});
	
}

function _delete_(table,opt,fn) {
	var args = _slice(arguments,1);
	async.waterfall([
			function (callback) {
				MongoClient.connect(url,function (err,client) {
					var db = client.db(dbName);
					callback(err,db);
				});
			},
			function (db,callback) {
				var collection = db.collection(table);
				collection.deleteOne(opt),function (err,result) {
					callback(err,result,db);
				};
			}
		],function (err,result,db) {
			if (err) {
				throw err;
			}
			fn(err,result);
			// db.close();
	});
}

//删光
function _clean_() {
		async.waterfall([
			function (callback) {
				MongoClient.connect(url,function (err,client) {
					var db = client.db(dbName);
					callback(err,db);
				});
			},
			function (db,callback) {
				var arr = ['rooms'];
				for (var i = 0; i < arr.length; i++) {
					var collection = db.collection(arr[i]);
					debugger
					collection.deleteMany({},function (err,result) {
						callback(err,result,db);
					});
				}
				
			}
		],function (err,result,db) {
			if (err) {
				throw err;
			}
			console.log(result);
			// db.close();
	});
}
exports.clean = _clean_;
exports.all = _all_;
exports.delete = _delete_;
exports.add = _add_;
exports.select = _select_;
