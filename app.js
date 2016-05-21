var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var init = require('./route/api/init');
var users = require('./route/api/user');
var recipe = require('./route/api/recipe');
var upload = require('./route/api/upload');
//var cors = require('cors');

var Memcached = require('memcached');
var memcached = new Memcached("recipe-memcache.zmeqg8.0001.use1.cache.amazonaws.com:11211");
//console.log(memcached);
memcached.on('failure', function(details) {
    sys.error("Server " + details.server + "went down due to: " + details.messages.join(''))
});
memcached.on('reconnecting', function(details) {
    sys.debug("Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")
});
memcached.set('foo', 'bar', 1000, function(err) { /* stuff */ });
memcached.get('foo', function(err, data) {
    console.log(data);
});
//var upload = require('./route/upload-api');

//create application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/_generate', express.static(path.join(__dirname, '_generate')));
//app.use(cors());

app.use('/ws', init);
app.use('/ws', users);
app.use('/ws', recipe);
app.use('/ws', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers


// config properties
app.locals.config = require('./lib/config/config.js');

// customize functions
app.locals.getMessage = function() {
    return 'by Kunal Chaudhari';
};

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;