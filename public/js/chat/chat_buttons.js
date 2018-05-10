var chat_buttons = function () {
	var _qq;
	var _history_list;
	function _init() {
		_cache();
		_bindEvent();
		_qq = qq.init();
		_history_list = history_list.init();
	}

	function _cache() {
		
	}

	function _bindEvent() {
		
	}

	return {
		init : _init,
	}
}();