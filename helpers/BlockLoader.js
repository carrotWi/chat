const Handlebars = require('handlebars')


module.exports = function (argument) {
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
