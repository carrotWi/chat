const mongo_opt = {
	cookieSecret: 'myblog',
	db: 'blog',
	host: 'localhost',
	port: 27017,
	url: 'mongodb://localhost/blog',
};

const session_opt = {
    secret: mongo_opt.cookieSecret,
    key: mongo_opt.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 1},//1 days
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({
    //     url: 'mongodb://localhost/blog'
    // })
};
const mysql_opt = {
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'chat',
};

module.exports.mongodb = mongo_opt;
module.exports.mysql = mysql_opt;
module.exports.session = function (mongo_store) {
	session_opt.store = mongo_store;
	return session_opt;
};