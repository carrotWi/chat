var user_list_ui = function () {
	var $tem_user;
	var $users;
	var _hb;
	var __io;

	function _init(_io,hb,userList) {
		__io = _io;
		_hb = hb;
		_cache();
		_bindEvent();

		// var init_data = arguments[0];
		// if (init_data) {
		// 	_hb.combine_replace($tem_user,$users,init_data);
		// }
		if (userList) {
			Object.keys(userList).forEach(function (key) {
				_add(userList[key].name);
			});
		}
		return this;
	}

	function _bindEvent() {
		__io.on('new_user',function (data) {
			_add(data.name);
			var str = '欢迎 : ' + data.name;
			char_ui.append(str);
		});
		__io.on('quit_user',function (data) {
			console.log(data.name);
			_remove(data.name);
		});
	}

	function _cache() {
		$tem_user = $('#user');
		$users = $('#users');
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
		add : _add,
		remove : _remove,
	}
}();