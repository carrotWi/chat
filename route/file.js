const chat_database = require('../libs/chat_database.js');
const colors = require('colors');
const async = require('async');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

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
						//从服务器拿到文件
						var tmp_path = item.path;
						var target_path = path.join(__dirname, '../tmp/', item.name);
						if (!tmp_path || !target_path) {
							var err = new Error('');
							cb(err);
							return
						}
						fs.rename(tmp_path, target_path, function (err) {
							if (err) {
								cb(err);
							} else {
								cb(null,tmp_path);
							}
						})

					}
				], function(err) {
					// result now equals 'done'   
					if (err) {
						callback(err);
					} else {
						callback(null);
					}
				});

			},
			function(err, msg) {
				// if any of the saves produced an error, err would equal that error
				if (err) {
					throw err;
				} else {
					res.send();
				}
			}
		);
	});
}