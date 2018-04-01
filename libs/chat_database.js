var mysql = require('mysql');




module.exports = function (opt) {
	var opt = opt || {
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : '',
};
	var connection = mysql.createConnection(opt);
	connection.connect();
		
	function _add(user) {
		
	}

	return {
		add : _add,
		verify : _verify,
	}
}