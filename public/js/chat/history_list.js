var history_list = function() {
	var $history_list;
	var _is_init = false;
	var _now_time;

	function _init() {
		if (_is_init) {
			return
		}

		_is_init = true;
		_cache();
		_bindEvent();
		_load_jq_ui();
		_init_data()
	}

	function _init_data() {
		_now_time = $history_list.datepicker("getDate");
	}

	function _load_jq_ui() {
		$("#datepicker").datepicker({
			inline: true
		});

	}

	function _cache() {
		$history_list = $('#datepicker');
	}

	function _bindEvent() {
		$history_list.change(_change_handle);
	}

	function _change_handle(event) {
		var t = $history_list.datepicker("getDate");
		if (t.toString() == _now_time.toString()) {
			return
		}
		_switch_history();
	}

	function _switch_history(t) {
		
	}


	function _now() {
		$history_list.datepicker( "setDate", _now_time );
		
	}

	return {
		init: _init,
	}
}

define(history_list);