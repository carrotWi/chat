
window.onload = function () {
	var data = {
		msgs : [{user:'1',msg:'111'}],
		users : [{user_name : 'root'}],
		rooms : [{room_name : 'room1'}],
		classList : 'user',
	}
	var data1 = {
		msgs : [{user:'1',msg:'111'}],
		users : [{user_name : 'root'}],
		rooms : [{room_name : 'room1'}],
		classList : 'msg',
	}
	data.msgs = _test_copy(data.msgs[0],10);
	data.users = _test_copy(data.users[0],10);
	hb.init();
	char.init();
	// hb.combine_append($('#msg'),$('#msgs'),data1);
	// hb.combine_append($('#user'),$('#users'),data);
	// hb.combine_append($('#user'),$('#users'),data);
}

function _test_copy(obj,times) {
		var result = [];
		for (var i = 0; i < times; i++) {
			result.push(obj);
		}
		return result;
	}


var hb = function () {
	
	
	function _init() {
		Handlebars.registerHelper('msg_p',function (context,option) {
			return context.map(function (value) {
				return option.fn(value);
			}).join(' ');
		});
		Handlebars.registerHelper('user_p',function (context,option) {
			return context.map(function (value) {
				return option.fn(value);
			}).join(' ');
		});
	}

	function _combine_replace($a1,$a2,data) {
		var template = Handlebars.compile($a1.html());
		var result = template(data);
		$a2.html(result);
	}

	function _combine_append($a1,$a2,data) {
		var template = Handlebars.compile($a1.html());
		var result = template(data);
		$a2.html($a2.html() + result);
	}


	/*
		todo
			init
			combine_append
			combine_replace
	 */
	return {
		init : _init,
		combine_replace : _combine_replace,
		combine_append : _combine_append,
	}
}()
