var enroll_ui = function () {
	var $form;
	var $name;
	var $enroll_dialog;
	function _init() {
		_cache();
		_bindEvent();
		_validate();
		$enroll_dialog.modal('show');
		return this;
	}
	function _validate() {
		$form.validate({
			rules : {
				name : {
					required: true,
					remote : {
						url : '/validate',
						type : 'POST',
						// datatyoe : 'json',
						data : {
							name : function () {
								return $name.val();
							}
						}
					},
				},
				password : {
					required: true,
				},
				affirm : {
					required: true,
				},
				sex : {
					required: true,
				},
				alias : {
					required: true,
				},
			},
			submitHandler : _form_handle,
			messages : {
				name : {
					remote : '用户名已被注册',
				}
			},
		});
	}
	function log(msg) {
		console.log(msg);
	}
	function _bindEvent() {
				// $form.submit(function (event) {
				// 	event.preventDefault();
				// 	_form_handle(this);
				// 	return false;
				// });
	}

	function _form_handle(form) {
			var $that = $(form);
					var opt = {
						type : $that.attr('method'),
						url : $that.attr('action'),
						data : $that.serialize(),  
						dataType: "json", 
						success : function (data) {
							$enroll_dialog.modal('hide');
							var str = data.name + '注册成功';
							tip_ui.trun('success',str);
						},
						beforeSend : function () {

						},
					}
					$.ajax(opt)
					// .done(function() { log("success"); })
					// .fail(function() { log("fail"); })
					// .always(function() { log("complete"); });
	}

	function _cache() {
		$name = $('#enroll_name');
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