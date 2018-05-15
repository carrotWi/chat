const chat_database = require('../libs/chat_database.js');
const colors = require('colors');
const async = require('async');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const m = require('../libs/chat_module.js');
module.exports = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		req.files = files;
		req.fields = fields;
		

		async.forEach(
			files,
			function(item, callback) {

				async.waterfall([
					function(cb) {
						try {
							//从服务器拿到文件
							var tmp_path = item.path;
							var target_path = path.join(__dirname, '../tmp/', item.name);
							var user_id = req.session.user.id;
							var room_id = req.session.room.id;
							var file = new m.File().init({
								"path": target_path,
								"size": item.size,
								"type": 'user_msg',
								"user_id": user_id,
								"room_id": room_id,
							});
							if (!tmp_path || !target_path) {
								var err = new Error('');
								cb(err);
								return
							}
						} catch (err) {
							cb(err)
						}
						fs.rename(tmp_path, target_path, function(err) {
							if (err) {
								cb(err);
							} else {
								cb(null, file);
							}
						})

					},
					function(file, cb) {
						//开始写数据库的逻辑
						chat_database.add_file(file,cb);
					}
				], function(err,file) {
					// result now equals 'done'   
					if (err) {
						callback(err);
					} else {
						debugger
						callback(null,file);
					}
				});

			},
			function(err, file) {
				// if any of the saves produced an error, err would equal that error
				if (err) {
					throw err;
				} 
				res.end();
			}
		);
	});
}

//拿到一个文件并写入数据库
function _waterfall_a(item, callback) {
	async.waterfall([
		function(cb) {
			try {
				//从服务器拿到文件
				var tmp_path = item.path;
				var target_path = path.join(__dirname, '../tmp/', item.name);
				var user_id = 4;
				var room_id = 1;
				var file = new m.file().init({
					"path": target_path,
					"size": item.size,
					"type": 'post_file',
					"user_id": user_id,
					"room_id": room_id,
				});
				if (!tmp_path || !target_path) {
					var err = new Error('');
					cb(err);
					return
				}
			} catch (err) {
				cb(err)
			}
			fs.rename(tmp_path, target_path, function(err) {
				if (err) {
					cb(err);
				} else {
					cb(null, file);
				}
			})

		},
		function(file, cb) {
			//开始写数据库的逻辑
			chat_database.add_file(file,cb);
		}
	], function(err,file) {
		// result now equals 'done'   
		if (err) {
			callback(err);
		} else {
			debugger
			callback(null,file);
		}
	});
}


function _waterfall_b(err,file,fn) {
	if(err){
		fn(err);
		return
	}
	async.waterfall([
	  function(callback){

	  }
	], function (err, result) {
	});

}

