var login_enroll_ui = function () {
	var $form;
	var _hb;
	var $frame;
	var $enroll;
	function _init(hb) {
		_hb = hb;
		_cache();
		_bindEvent();
		return this;
	}
	function log(msg) {
		console.log(msg);
	}
	function _bindEvent() {
		$form.submit(function (event) {
			event.preventDefault();
			var $that = $(this);
			var opt = {
				type : $that.attr('method'),
				url : $that.attr('action'),
				data : $that.serialize(),  
				dataType: "json", 
				success : function (data) {
					if (data.verify) {
						$frame.slideToggle(1000);
						char_ui.open();	
					}
				},
				beforeSend : function () {
				},
			}
			$.ajax(opt)
			.done(function() { log("success"); })
    		.fail(function() { log("fail"); })
    		.always(function() { log("complete"); });
			return false;
		});
		$enroll.click(function () {
			enroll_ui.init(_hb);
		});
	}
	function _cache() {
		$form = $('#login_enroll');
		$frame = $('#login_enroll_frame');
		$enroll = $('#enroll');
	}
	function _add(name) {
		var data = {
			users : [{name : name}],
		}
		hb.combine_append($tem_user,$users,data);
	}
	function _remove(name) {
		var $user = $users.children();
		$user.each(function (index,item) {
			if ($(item).html() === name) {
				$(item).remove();
			}
		});
	}
	/*
		todo
			add
			remove
	 */
	return {
		init : _init,
	}
}();