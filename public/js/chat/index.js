window.onload = function() {
	_io.init('http://localhost:8088');
	hb.init();
	//按钮组
	chat_buttons.init();
	//各种提示
	tip_ui.init();
	//登陆和注册
	login_enroll_ui.init(_io);

	_io.on('user_list', function(data) {
		user_list_ui.init(_io, hb, data);
	});

	_io.on('online_user_list', function(data) {
		user_list_ui.update_online_user(data);
	});

	_io.on('msg_list', function(data) {
		char_ui.init(_io, hb, data);
	});

	_io.on('room_list', function(data) {
		nav_ui.init(_io, hb, data);
		_io.on('now_room', function(data) {
			nav_ui.updata_now_room(data);
		});
	});
}