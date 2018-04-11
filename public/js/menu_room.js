var menu_room = function () {
	var _hb;
	var $select;
	var _io;
	var $template;
	function _init(io,hb,romm_list) {
		_hb = hb;
		_io = io;
		_cache();
		_bindEvent();
		// if (romm_list) {
		// 	for (var i = 0; i < romm_list.length; i++) {
		// 		var room = romm_list[i];
		// 		var data = room;
				_show_room_handle(romm_list);
		// 	}
		// }
		return this;
	}

	function _bindEvent() {
		
	}

	function _show_room_handle(romm_list) {
		var data = {
			rooms : romm_list,
		}
		debugger
		_hb.combine_replace($template,$select,data);
	}

	function _cache() {
		$select = $('#menu_room');
		$template = $('#room_item');
	}
	/*
		todo
			add
	 */
	return {
		init : _init,
	}
}();