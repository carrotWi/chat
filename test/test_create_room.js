const http = require('http');
const URL = require('url')
var url = URL.parse('http://localhost:8088/room');
var opt = {
	space : 'room',
}
opt = JSON.stringify(opt);
var req = http.request(url, function (res) {
	var bufs = [];
	res.on('data',function (data) {
		bufs.push(data)
	});
	res.on('end',function () {
		var str = Buffer.concat(bufs).toString();
		console.log(str);
	});
}).on('error',function (err) {
	console.log(err);
});
req.end(opt);
