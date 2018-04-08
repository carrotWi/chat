var tip_ui = function () {
	var $tip;
	function _init() {
		_cache();
		_bindEvent();
		return this;
	}
	function log(msg) {
		console.log(msg);
	}
	function _bindEvent() {

	}
	function _cache() {
		$tip = $('#tip');
	}
	function _switch(classname,msg) {
		var class_arr = ['alert',classname];
		$tip.attr('class',class_arr.join(' '));
		$tip.html(msg);
	}
	function _warn(msg) {
		var classname = 'alert-warning';
		var msg = msg || '警告';
		_switch(classname,msg);
	}
	function _success(msg) {
		var classname = 'alert-success';
		var msg = msg || '成功';
		_switch(classname,msg);
	}
	function _fail(msg) {
		var classname = 'alert-danger';
		var msg = msg || '失败';
		_switch(classname,msg);
	}
	// function _show(flag) {
	// 		$tip.slideToggle("slow");
	// 		switch(flag) {
	// 			case 'warn':
	// 				_warn();
	// 				break;
	// 			case 'success':
	// 				_success();
	// 				break;
	// 			case 'fail':
	// 				_fail();
	// 				break;
	// 		}
	// 	}
	
	function _trun(flag,msg) {
		$tip.slideToggle("fast");
		setTimeout(function () {
			$tip.slideToggle("slow");
			switch(flag) {
				case 'warn':
					_warn(msg);
					break;
				case 'success':
					_success(msg);
					break;
				case 'fail':
					_fail(msg);
					break;
			}
		},500);
		setTimeout(function () {
			$tip.slideToggle("slow");
		},4000);
		// debugger
		
	}
	/*
		todo
			trun
	 */
	return {
		init : _init,
		trun : _trun,
	}
}();