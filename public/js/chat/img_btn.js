var img_btn = function() {
	var $btn;


	function _init() {
		_cache();
		_bind_event();
	}

	function _cache() {
		$btn = $('#img_btn');

	}

	function _bind_event() {
		$btn.click(show_hadnle);

	}

	function show_hadnle(e) {
		img_dialog.init();
	}

	return {
		init: _init,
	}
}();