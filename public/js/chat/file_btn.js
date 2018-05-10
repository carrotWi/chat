var file_btn = function() {
	var $btn;


	function _init() {
		_cache();
		_bind_event();
	}

	function _cache() {
		$btn = $('#file_btn');

	}

	function _bind_event() {
		debugger
		$btn.click(show_hadnle);

	}

	function show_hadnle(e) {
		file_dialog.init();
	}

	return {
		init: _init,
	}
}();