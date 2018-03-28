window.onload = function () {
	//用jquery获取模板
	var tpl   =  $("#tpl").html();
	var str = '{{#list array}}{{@index}}. {{title}}{{/list}}';
	Handlebars.registerPartial('test',str);
	Handlebars.registerHelper('list',function (content,option) {
		var result = '';
		for (var i = 0; i < content.length; i++) {
			result += option.fn(content[i],{data : {index : i}});
		}
		return result
	});
	//预编译模板
	var template = Handlebars.compile(tpl);
	//模拟json数据
	var context = {
		array : [{title : 1},{title : 2}]
	};
	//匹配json内容
	var aaa = template(context);
	//输入模板
	$("#wrap").html(aaa);
}
