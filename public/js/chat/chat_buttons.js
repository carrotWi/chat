var chat_buttons = function () {
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
		_qq = qq.init();
		_history_list = history_list.init();
		_img_btn = img_btn.init();	
		_user_btn = user_btn.init();
		_file_btn = file_btn.init(); 
	}

	function _bindEvent() {
		
	}

	return {
		init : _init,
	}
}();