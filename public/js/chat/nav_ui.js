//底部导航栏
var nav_ui = function() {
	var _hb;
	var $select;
	var _io;
	var $template;
	var $count;
	var $create_room_btn;
	var $body;
	var $show_room;
	var _is_init = false;
	//记录打上标记的房间
	var $now_room;

	function _init(io, hb, romm_list) {
		if (_is_init) {
			return;
		}
		_is_init = true;
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

	function _render(num) {
		$count.text(num);
	}

	function _bindEvent() {
		$select.click(_switch_room_hadnle);
		$create_room_btn.click(_show_enroll_room_handle);
	}

	function _switch_room_hadnle(e) {
		var $target = $(e.target);
		var space = $target.text();
		var room = {
			'space': space,
		};
		_io.emit('switch_room', room);
	}

	function _show_enroll_room_handle(e) {
		enroll_room_ui.init(_io);
	}
	//当前所在房间
	function _active_room(room) {

	}
	//初始化房间列表
	function _show_room_handle(romm_list) {
		var data = {
			rooms: romm_list,
		}
		_hb.combine_replace($template, $select, data);
		_update_count(romm_list.length);
	}

	function _cache() {
		$select = $('#rooms_list');
		$template = $('#room_selector');
		$count = $('#rooms_count');
		$create_room_btn = $('#create_room');
		$body = $('#nav_rooms');
		$show_room = $('#show_room');
	}
	/*
		1.更新显示器
		2.更新列表栏视图
			1.去掉原来的标记
			2.打上新的标记
	 */
	function _updata_now_room(room) {
		_update_show(room);
		_updata_flag(room);
	}

	function _update_show(room) {
		//更新显示器
		$show_room.find('a').html(room.space);
	}

	function _updata_flag(room) {
		remove_flag();
		add_flag(room);
	}
	//去除原来的标记
	function remove_flag() {
		if ($now_room) {
			$now_room.removeClass('active');
		}
	}
	//打上新的标记
	function add_flag(room) {
		$now_room = $select.find('li');
		$now_room.each(function (index,item) {
			var $that = $(item);
			$that = $that.find('a');
			if ($that.text() === room.space) {
				$now_room = $that.parent();
			}
		});
		$now_room.addClass('active');
	}
	return {
		init: _init,
		updata_now_room: _updata_now_room,
	}
}();