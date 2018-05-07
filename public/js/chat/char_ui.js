var char_ui = function() {
	var $send;
	var $msgs;
	var $tem_msg;
	var $context;
	var $form;
	var __io;
	var _hb;
	var _is_init = false;


	function _init(_io, hb, msg_list) {
		if (_is_init) {
			_replace_msg_list(msg_list);
			return this;
		}
		_is_init = true;
		_hb = hb;
		__io = _io;
		_cache();
		_bindEvent();
		$send.attr('disabled', 'disabled');
		//收到聊天记录
		if (msg_list) {
			_append_msg_list(msg_list);
		}
	}

	function _open() {
		$send.removeAttr('disabled');
	}

	function _bindEvent() {
		$form.submit(function() {
			return false;
		});
		$send.click(_send_msg_handle);
		__io.on('msg', function(data) {
			_show_msg_handle(data);
		});
	}

	//加一条消息,单传渲染,不发socket
	function _show_msg_handle(msg) {
		var data = {
			msgs: [msg],
		}
		_hb.combine_append($tem_msg, $msgs, data);
		_bottom($msgs);
	}
	//替换所有消息
	function _replace_msg(msgs) {
		var data = {
			msgs: msgs,
		}
		_hb.combine_replace($tem_msg, $msgs, data);
		_bottom($msgs);
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

	function _add(context) {
		var msg = {
			text: context,
		}
		__io.send(msg);
		msg.name = 'you';
		var data = {
			msgs: [msg]
		}
		_hb.combine_append($tem_msg, $msgs, data);
		_bottom($msgs);
	}

	function _append(context) {
		var data = {
			msgs: [{
				name: '管理员',
				text: context,
			}]
		}
		_hb.combine_append($tem_msg, $msgs, data);
		_bottom($msgs);
	}
	//将滚动条放在最下面
	function _bottom($dom) {
		var top = $dom[0].scrollHeight;
		$dom.scrollTop(top);
	}

	function _replace_msg_list(msg_list) {
		var arr = [];
		for (var i = 0; i < msg_list.length; i++) {
			var msg = msg_list[i];
			arr.push(msg);
		}
		_replace_msg(arr);
	}

	function _append_msg_list(msg_list) {
		for (var i = 0; i < msg_list.length; i++) {
			var msg = msg_list[i];
			var data = msg;
			_show_msg_handle(data);
		}
	}

	function _clean() {

	}
	return {
		init: _init,
		send: _add,
		open: _open,
		append: _append,
		append_msg_list: _append_msg_list,
		replace_msg_list: _replace_msg_list,
	};
}();