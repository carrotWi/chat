//添加房间的表单
var enroll_room_ui = function () {
	var $form;
	var $room_name;
	var $enroll_dialog;
	var $create_room;
	function _init() {
		_cache();
		_bindEvent();
		_validate();
		$create_room.removeAttr('disabled');
		return this;
	}
	function _show_handle() {
		$enroll_dialog.modal('show');
	}
	function _validate() {
		$form.validate({
			rules : {
				space : {
					required: true,
					remote : {
						url : '/validate',
						type : 'POST',
						data : {
							space : function () {
								return $room_name.val();
							}
						}
					},
				},
			},
			submitHandler : _form_handle,
			messages : {
				space : {
					remote : '房间名已被注册',
				}
			},
		});
	}
	function _bindEvent() {
		$create_room.click(_show_handle);
	}
	function _form_handle(form) {
		var $form = $(form);
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
		.done(function() { log("success"); })
		.fail(function() { log("fail"); })
		.always(function() { log("complete"); });
	}
	function _cache() {
		$form = $('#room_form');
		$enroll_dialog = $('#room_dialog');
		$room_name = $('#room_name');
		$create_room = $('#create_room');
	}
	return {
		init : _init,
	}
}();