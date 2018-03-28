var char = function () {
	var $send;
	var $msgs;
	var $users;
	var $context;
	var $form;
	var _hb;
	var _username;

	function _init() {
		_hb = hb.init();
		_cache();
		_bindEvent();
	}

	function _bindEvent() {
		$form.submit(function () {
			return false;
		});
		$send.click(_send_msg_handle);
	}

	function _send_msg_handle() {
		_send($context.val(),'(username)');
		$context.val('');
	}

	function _cache() {
		$send = $('#send_msg');
		$msgs = $('.msg');
		$users = $('.user');
		$form = $('#chat');
		$context = $('#context_msg');
	}

	function _send(msg,username) {
		var data = {
			msgs : [{user : username,msg : msg,}],
		}
		hb.combine_append($('#msg'),$('msgs'),data);
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
		send : _send,
	}
}();