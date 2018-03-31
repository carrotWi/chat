var _io = function () {
	var __io;

	function _init(path) {
			__io = io.connect(path);
			return this;
		}

	function _send(msg) {
			__io.emit('msg',msg);
		}	

	function _on(event,handle) {
		__io.on(event,handle);
	}

	function _once(event,handle) {
		__io.once(event,handle);
	}
	/*
		todo
			send
			_add_emit
	 */
	return {
		init : _init,
		on : _on,
		once : _once,
		send : _send,
	}
}();