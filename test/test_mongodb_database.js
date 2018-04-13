var database = require('../libs/chat_cache_database.js');
var msg = function () {
	this.name = 1;
	this.age = 10;
}
database.clean('msgs',[new msg()]);