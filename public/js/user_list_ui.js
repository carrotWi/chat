var user_list_ui = function () {
	var $tem_user;
	var $users;
	var _hb;
	var __io;
	var _user_list ;

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
			_user_list = userList;
			Object.keys(userList).forEach(function (key) {
				_add(userList[key]);
			});
		}
		return this;
	}

	function _bindEvent() {
		__io.on('new_user',function (data) {
			// _add(data.name);
			_online(data);
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

	function _add(user) {
		var data = {
			users : [user],
		}
		_hb.combine_append($tem_user,$users,data);
	}

	function _online(user) {
		var $btns = $users.find('Button');
		$btns.each(function (index,item) {
			var $btn = $(item);
			console.log($btn[0]);
			if ($btn.data('user-id')===user.id) {
				$btn.removeAttr('disabled');
			}
		});
	}

	function _remove(name) {
		var $user = $users.children();
		$user.each(function (index,item) {
			if ($(item).html() === name) {
				$(item).remove();
			}
		});
	}

	function _update_online_user(users) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			var $btns = $users.find('Button');
			$btns.each(function (index,item) {
				var $btn = $(item);
				console.log($btn[0]);
				if ($btn.data('user-id')===user.id) {
					$btn.removeAttr('disabled');
				}
			});
		}
	}
	/*
		todo
			add
			remove
			online
	 */
	return {
		init : _init,
		add : _add,
		update_online_user : _update_online_user, 
		remove : _remove,
		online : _online,
	}
}();