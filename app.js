#!/usr/bin/env node

'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
const commander = require('commander');
const packageData = require('./package');
// const MongoStore = require('connect-mongo')(session);
// const mongoose = require('mongoose');
const hbs = require('hbs');
// const mkdirp = require('mkdirp');

global._ = require('lodash');
global._async = require('async');


commander
    .version(packageData.version)
    // .option('-D --dropCollections', 'drop all collections')
    // .option('-d --defaultData', 'create default data')
    .option('-p --port <n>', 'set port, default is 3000', parseInt)
    .option('-i --instance <n>', 'set instance number, default is 0', parseInt)
    .option('-c --cwd <s>', 'set current working directory')
    .parse(process.argv);


const app = express(); // create Express App

app.set('x-powered-by', false);
app.set('X-Powered-By', false);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizeNumber(val) {
    var n = parseInt(val, 10);

    if (isNaN(n)) {
        // named pipe
        return val;
    }

    if (n >= 0) {
        // port number
        return n;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


var debug,
    http,
    PORT = normalizeNumber(process.env.PORT || commander.port || '3000'),
    INSTANCE = normalizeNumber(process.env.INSTANCE || commander.instance || '0'),
    CWD = process.env.CWD || commander.cwd || null,
    server;

if (!CWD) CWD = process.cwd();

app.set('port', PORT);
app.set('instance', INSTANCE);



console.log('ENV:', app.get('env'));

_async.series({
        // change current working directory
        cwd(cb) {
            if (CWD !== process.cwd()) {
                try {
                    process.chdir(CWD);
                    console.log('SET CWD to ' + CWD);
                } catch (err) {
                    return cb(err);
                }
            }
            cb();
        },
        createDefDirectories(cb) {
            // mkdirp.sync('[somedir]');

            cb(null);
        },
        db(cb) {
            require('./db')(app, (err) => {
                if (err) return cb(err);

                cb();
            });
        },
        defaultMidelware: function(cb) {
            // view engine setup
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'hbs');

            app.use(bodyParser.json({
                extended: false
            }));

            app.use(bodyParser.urlencoded({
                extended: false
            }));

            app.use(cookieParser());
            // app.use(require('less-middleware')(path.join(__dirname, 'public')));
            app.use(express.static(path.join(__dirname, 'public')));

            if(process.env.NODE_ENV !== 'production'){
                app.use(logger('dev'));
            }

            // app.use(session({
            //     secret: ---someRundomString,
            //     resave: false,
            //     saveUninitialized: true,
            //     cookie: {
            //         path: '/',
            //         //                    httpOnly: true, // <- set httpOnly to false
            //         secure: false,
            //         maxAge: 14 * 24 * 60 * 60 * 1000
            //     },
            //     store: new MongoStore({
            //         mongooseConnection: mongoose.connection,
            //         stringify: false,
            //     })
            // }));

            // app.use(passport.initialize());
            // app.use(passport.session());

            hbs.registerPartials(__dirname + '/views/partials');

            cb(null);
        },
        handlers: function(cb) {
            require('./handlers')(app, err => {
                if (err) return cb(err);
                console.log('Load: handlers');
                cb();
            });
        },
        appRouts: function(cb) {
            app.use(require('./routes')(app));
            console.log('Load: routes');
            cb(null);
        },
        erroeHandlers(cb) {
            // catch 404 and forward to error handler

            // var ErrorHandler = app.set('ErrorHandler');

            // error handlers

            // development error handler
            // will print stacktrace

            if (app.get('env') === 'production') {
                // production error handler
                // no stacktraces leaked to user
                app.use(function(err, req, res, next) {
                    console.log(require('util').inspect(err, {
                        colors: true,
                        depth: null
                    }));

                    // console.log('Erorr:', err);
                    // console.log(err.stack);
                    if (typeof err.status !== 'number') err.status = parseInt(err.status) || 500;
                    res
                        .status(err.status)
                        .send({
                            name: err.name,
                            message: err.message,
                            //                        stack:err.stack
                        });
                });
            } else {
                app.use(function(err, req, res, next) {

                    console.log('Erorr:', err);
                    console.log(err.stack);

                    if (typeof err.status !== 'number') err.status = parseInt(err.status) || 500;
                    res
                        .status(err.status)
                        .send({
                            name: err.name,
                            message: err.message,
                            stack: err.stack
                        });
                });
            }


            cb(null);
        },
        server(cb) {
            debug = require('debug')('myApp:server');
            http = require('http');

            /**
             * Create HTTP server.
             */

            server = http.createServer(app);

            /**
             * Listen on provided port, on all network interfaces.
             */

            server.listen(PORT);
            console.log('Express start on port:', PORT);

            server.on('error', onError);
            server.on('listening', onListening);

            app.httpServer = server;
            cb(null);
        },
        // web soket
        // ws(cb) {
        //     var WsHandler = require('./ws');
        //     app.Handlers.WsHandler = new WsHandler(app);
        //     cb(null);
        // },
        // cron(cb) {
        //     require('./cron')(app);
        //     cb(null);
        // },
    },


    function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Ready!!!');
    });


module.exports = app;
