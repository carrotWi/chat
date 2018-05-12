var _io = function(require) {
	var __io;
	function _init(path) {
		__io = io.connect(path);
		return this;
	}

	function _send(msg) {
		__io.emit('msg', msg);
	}

	function _on(event, handle) {
		__io.on(event, handle);
	}

	function _once(event, handle) {
		__io.once(event, handle);
	}

	function _emit(event, data) {
		__io.emit(event, data);
	}

	function _get_io() {
		return __io;
	}
	/*
		todo
			send
			_add_emit
	 */
	return {
		init: _init,
		on: _on,
		emit: _emit,
		once: _once,
		send: _send,
		get_io: _get_io,
	}
}

define(_io);