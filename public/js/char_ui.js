var char = function () {
	var $send;
	var $msgs;
	var $tem_msg;
	var $context;
	var $form;
	var __io;
	var _hb;

	function _init(_io,hb,msg_list) {
		_hb = hb;
		__io = _io;
		_cache();
		_bindEvent();

		if (msg_list) {
			for (var i = 0; i < msg_list.length; i++) {
				var msg = msg_list[i];
				var data = {
					name : msg.username,
					msg : msg.text,
				}
				_show_msg_handle(data);
			}
		}
	}

	function _bindEvent() {
		$form.submit(function () {
			return false;
		});
		$send.click(_send_msg_handle);
		__io.on('msg',function (data) {
			_show_msg_handle(data);
		});
	}

	//加一条消息,单传渲染,不发socket
	function _show_msg_handle(data) {
		var data = {
			msgs : [{name : data.name , msg : data.msg,}]
		}
		_hb.combine_append($tem_msg,$msgs,data);
	}

	function _send_msg_handle() {
		_add($context.val());
		$context.val('');
	}

	function _cache() {
		$send = $('#send_msg');
		$msgs = $('#msgs');
		$form = $('#chat');
		$context = $('#context_msg');
		$tem_msg = $('#msg');
	}

	function _add(msg) {
		var data = {
			msgs : [{name : 'you' , msg : msg,}]
		}
		_hb.combine_append($tem_msg,$msgs,data);
		__io.send(msg);
	}
	/*
		todo
			send
			chose
				user
				msg
	 */
	return {
		init : _init,
		send : _add,
	};
}();