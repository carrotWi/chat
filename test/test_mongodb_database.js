var database = require('../libs/chat_database.js');
var m = require('../libs/chat_module.js');
var tools = require('../tools/index.js')
var u = new m.User().init({
	'id' : 125,
	'password' : '222',
	'name' : 'root',
});
var r = new m.Room().init({
	'name' : 'public',
	'space' : '/',
});
var msg = new m.Msg().init({
	user_id : 136,
	text : '136',
	room_id : '53',
});
// database.add('msg',new m.Msg('text',111,111,111),function (err) {
// 	console.log(err);
// });

//测试类型
// database.add('msg',msg,function (err) {
// 	if (err) {
// 			console.log(err);
// 			return;
// 		}
// 	database.all('msg',function (err,users) {
// 		debugger
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 	});
// });




// database.update('user',u,function (err) {
// 	debugger
// 	if (err) {
// 		console.log(err);
// 	}
// });
// 
// database.all('user',function (err,users) {
// 	debugger
// });
// var target = {
// 	name : '111',
// }
// var arr = [target];
// var result = tools('filter',arr,function (obj) {
// 	throw new Error('test');
// 	return obj.name ==='111';
// },function () {
// 	debugger
// });
