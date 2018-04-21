/******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express')
const app = express()
const engines = require('consolidate')
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const setting = require('./setting.js');
const mongo_store = require('connect-mongo')(session);
// view engine setup
// app.engine('hbs', engines.handlebars)
// app.set('views', './views')
// app.set('view engine', 'hbs')
// Loading partials
// const loadPartials = require('./helpers/partialsLoader')
// loadPartials()
// Loading middleware
// Declaring application routes
//打印promise未捕获错误
process.on('unhandledRejection', reason =>
{
	console.log(reason); 
});
const routes = require('./route/index.js');
app.use('/', routes);
// static middleware after the routes
app.use('/public', express.static('public'));
app.use('/views',express.static('views'));
app.use(cookie_parser());
var m_t = new mongo_store(setting.mongodb);
var session_opt = setting.session(m_t);
app.use(session(session_opt));
// catch 404
// app.use((req, res, next) => {
//   res.render('404', {})
// })

// binding application to specified port
const server = app.listen(
  8088,
  () => {
    console.log(`Server is running at http://localhost: ${server.address().port}`)
  }
)

var socket = require('./libs/chat_server.js');
socket(server);

