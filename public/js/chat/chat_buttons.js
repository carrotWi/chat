var chat_buttons = function (require) {
	var _qq;
	var _history_list;
	var _img_btn;
	var _user_btn;
	var _file_btn;

	function _init() {
		_cache();
		_bindEvent();
	}

	function _cache() {
		_qq = require('./qq').init();
		_history_list = require('./history_list').init();
		_img_btn = require('./img_btn').init();	
		_user_btn = require('./user_btn').init();
		_file_btn = require('./file_btn').init(); 
	}

	function _bindEvent() {
		
	}

	return {
		init : _init,
	}
}

define(chat_buttons);