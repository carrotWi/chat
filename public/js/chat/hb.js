window.onload = function() {
	_io.init('http://localhost:8088');
	hb.init();
	qq.init();
	tip_ui.init();
	history_list.init();
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

function _test_copy(obj, times) {
	var result = [];
	for (var i = 0; i < times; i++) {
		result.push(obj);
	}
	return result;
}

var hb = function() {


	function _init() {
		Handlebars.registerHelper('msg_p', function(context, option) {
			return context.map(function(value) {
				return option.fn(value);
			}).join(' ');
		});
		Handlebars.registerHelper('user_p', function(context, option) {
			return context.map(function(value) {
				return option.fn(value);
			}).join(' ');
		});
		Handlebars.registerHelper('room_option', function(context, option) {
			return context.map(function(value) {
				return option.fn(value);
			}).join(' ');
		});
		Handlebars.registerHelper('qq_option', function(context, option) {
			return context.map(function(value) {
				return option.fn(value);
			}).join(' ');
		});

		return this;
	}

	function _combine_replace($a1, $a2, data) {
		var template = Handlebars.compile($a1.html());
		var result = template(data);
		// console.log(result);
		$a2.html(result);
	}

	function _combine_append($a1, $a2, data) {
		var template = Handlebars.compile($a1.html());
		var result = template(data);
		$a2.html($a2.html() + result);
	}

	return {
		init: _init,
		combine_replace: _combine_replace,
		combine_append: _combine_append,

	}
}()