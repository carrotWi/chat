var enroll_ui = function () {
	var _hb;
	var $form;
	var $enroll_dialog;
	function _init(hb) {
		_hb = hb;
		_cache();
		_bindEvent();
		$enroll_dialog.modal('show');
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
							console.log(data);
							$enroll_dialog.modal('hide');
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
	}

	function _cache() {
		$enroll_dialog = $('#enroll_dialog');
		$form = $('#enroll_form');
	}

	

	/*
		todo
			
	 */
	return {
		init : _init,
	}
}();