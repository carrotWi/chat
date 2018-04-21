//底部导航栏
var nav_ui = function () {
	var _hb;
	var $select;
	var _io;
	var $template;
	var $count;
	var $create_room_btn;
	var $body;
	function _init(io,hb,romm_list) {
		_hb = hb;
		_io = io;
		_cache();
		_bindEvent();
		_show_room_handle(romm_list);
		$body.show('slow');
		return this;
	}
	function _update_count(num) {
		_render(num);
	}
	function _render (num) {
		$count.text(num);
	}
	function _bindEvent() {
		$create_room_btn.click(_show_enroll_room_handle);
	}
	function _show_enroll_room_handle(argument) {
		enroll_room_ui.iniy();
	}
	//当前所在房间
	function _active_room(room) {
		
	}
	//初始化房间列表
	function _show_room_handle(romm_list) {
		var data = {
			rooms : romm_list,
		}
		_hb.combine_replace($template,$select,data);
		_update_count(romm_list.length);
	}

	function _cache() {
		$select = $('#rooms_list');
		$template = $('#room_selector');
		$count = $('#rooms_count');
		$create_room_btn = $('#create_room_btn');
		$body = $('#nav_rooms');
	}
	return {
		init : _init,
		// active_room : _active_room,
	}
}();