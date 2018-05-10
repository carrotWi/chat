const chat_database = require('../libs/chat_database.js');
const colors = require('colors');
const async = require('async');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

module.exports = function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req,function (err,fields,files) {
		req.files = files;
		req.fields = fields;
		debugger
	});

}