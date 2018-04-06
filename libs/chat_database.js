var mysql = require('mysql');
var async = require('async');
module.exports = function (opt) {
	var opt = opt || {
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'chat_user',
};
	var connection = mysql.createConnection(opt);
	connection.connect();
	//用户注册时用的函数
	//data-->json
	function _add(data) {
		var name = data.name;
		var password = data.password;
		var sex = data.sex;
		var alias = data.alias;
		async.waterfall([
				function (callback) {
					//用户密码字段
					_add_user_password(name,password,function (err,result,field) {
						callback(err,result,field);
					})
				},
				function (arg0,arg1,callback) {
					//用户注册时间字段 
					var user_id = arg0.insertId;
					var time = format_stamp();
					_add_enroll_time(user_id,time,function (err,result,field) {
						callback(err,result,field);
					});
				},
				function (arg0,arg1,callback) {
					//用户注册昵称字段
					var user_id = arg0.insertId;
					_add_user_alias(user_id,alias,function (err,result,field) {
						callback(err,result,field);
					});

				},
				function (arg0,arg1,callback) {
					//用户注册性别字段
					var user_id = arg0.insertId;
					_add_user_sex(user_id,sex,function (err,result,field) {
						callback(err,result,field);
					});
				}
			],function (err,result) {
				if (err) {
					throw err;
				}
				// connection.close();
			});
	}
	//生成xxxx-xx-xx xx:xx:xx
	function format_stamp() {
		var data = new Date();
		data = {
			year : data.getFullYear(),
			month : data.getMonth() + 1,
			day : data.getDay(),
			hours : data.getHours(),
			minutes : data.getMinutes(),
			seconds : data.getSeconds(),
		}
		var left = [data.year,data.month,data.day];
		var right = [data.hours,data.minutes,data.seconds];
		var all = [left.join('-'),right.join(':')];
		var str = all.join(' ');
		return str;
	}

	//增加用户名和密码的字段
	function _add_user_password(name,password,callback) {
		var sql = 'INSERT INTO user_password (name,password) VALUES (?,?);';
		var value = [name,password];
		connection.query(sql,value,callback);
	}
	//增加用户名注册时间的字段
	//time --> xxxx-xx-xx xx:xx:xx
	function _add_enroll_time(user_id,date,callback) {
		var sql = 'INSERT INTO enroll_time (user_id,date) VALUES (?,?);';
		var value = [user_id,date];
		connection.query(sql,value,callback);
	}
	//增加用户名注册昵称的字段
	function _add_user_alias(user_id,alias,callback) {
		var sql = 'INSERT INTO user_alias (user_id,alias) VALUES (?,?);';
		var value = [user_id,alias];
		connection.query(sql,value,callback);
	}
	//增加用户名注册性别的字段
	function _add_user_sex(user_id,sex,callback) {
		var sql = 'INSERT INTO user_sex (user_id,sex) VALUES (?,?);';
		var value = [user_id,sex];
		connection.query(sql,value,callback);
	}
	//校对帐号密码
	//data-->json
	function _verify(data,callback) {
		var name = data.name;
		var password = data.password;
		_select_user_password(name,password,function (err,result,field) {
			if (err) {throw err;}
			callback(result);
		});
	}
	//查询用户帐号密码是否存在
	function _select_user_password(name,password,callback) {
		var sql = 'SELECT * FROM user_password WHERE name=? AND password=?;';
		var value = [name,password];
		connection.query(sql,value,callback);
	}

	return {
		add : _add,
		verify : _verify,
	}
}