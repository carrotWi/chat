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