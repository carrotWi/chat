//房间选择  废弃
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
		_show_room_handle(romm_list);
		return this;
	}

	function _bindEvent() {
		
	}

	function _show_room_handle(romm_list) {
		var data = {
			rooms : romm_list,
		}
		_hb.combine_replace($template,$select,data);
	}

	function _cache() {
		$select = $('#menu_room');
		$template = $('#room_item');
	}
	return {
		init : _init,
	}
}();