var user_btn = function() {
	var $btn;
	//col-md-3 

	function _init() {
		_cache();
		_bind_event();
	}

	function _cache() {
		$btn = $('#user_btn');
	}

	function _bind_event() {
		$btn.click(_show_handle);
	}

	function _show_handle(e) {
		//调整大小
		//聊天信息区域大小
		//		用户列表的大小
		//		显示用户列表
		char_ui.toggle();
		user_list_ui.toggle();

	}

	return {
		init: _init,
	}
}();