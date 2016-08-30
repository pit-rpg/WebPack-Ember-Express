'use strict';

const fs = require('fs');
const path = require('path');
// const mkdirp = require('mkdirp');
const exec = require('child_process').exec;
const app = require('../app');
// const mongoose = require('mongoose');

function AppHandler(app) {
    var logsDir = path.join('./', 'logs');
    var forceQuit = 10;
    var crashLogPath = path.join(logsDir, 'crash.log');

    // mkdirp.sync(logsDir);

    this.onEnd = (eventData, eventName) => {
        if (forceQuit === 0) {
            console.log('Force Quit!!!!!!!!!!!!');
            process.exit(eventData);
        }

        if (eventName === 'uncaughtException') console.error(eventData);


        console.log(`\nHTTP server: begins to stop... \nrepeat ${forceQuit}-times for force quit`);
        forceQuit--;

        _async.series([
            // close Websockets
            // (cb) => {
            //     if (!app.Handlers || !app.Handlers.WsHandler) {
            //         return cb();
            //     }
            //
            //     console.log('WebSockets: closing.....');
            //
            //     app.Handlers.WsHandler.wsServer.close(function(err) {
            //         if (err) return cb(err);
            //
            //         console.log('WebSockets: closed!');
            //
            //         cb();
            //     });
            // },
            // close conections
            (cb) => {
                if (!app.httpServer) {
                    console.error('\nHTTP server is not defined!?');
                    return cb();
                }

                console.log('\nHTTP server: closing...');

                app.httpServer.close((err) => {
                    if (err) return cb(err);

                    console.log('HTTP server: closed!');

                    cb();
                });
            },
            // close db
            // (cb) => {
            //     console.log('MongoDB: closing.....');
            //
            //     mongoose.disconnect(function(err) {
            //         if (err) return cb(err);
            //
            //         console.log('MongoDB: closed!');
            //
            //         cb();
            //     });
            // },
            // if crash write log
            (cb) => {
                if (eventName !== 'uncaughtException') return cb();

                console.error('---!!!UNCAUGHT-EXCEPTION!!!---');

                this.creshReport(eventData, cb);
            },
        ], (err) => {
            if (err) console.error(err);

            console.log('Server going down...');

            process.exit(err);
        });
    };

    this.creshReport = (err, cb) => {

        var errStr = '';
        var hr = '<====================================>';

        errStr += '\n';
        errStr += hr + '\n';


        _async.series([
            // get git data
            (cb) => {

                _async.series([
                    // get branch
                    (cb) => {
                        exec('git rev-parse --abbrev-ref HEAD', (error, stdout) => {
                            if (error) {
                                cb(`exec error: ${error}`);
                                return;
                            }

                            errStr += `branch: ${stdout}`;

                            cb();
                        });
                    },
                    // get commit
                    (cb) => {
                        exec('git rev-parse --verify HEAD', (error, stdout) => {
                            if (error) {
                                cb(`exec error: ${error}`);
                                return;
                            }

                            errStr += `commit: ${stdout}`;

                            cb();
                        });
                    },
                    // git commit name
                    (cb) => {
                        exec('git log --oneline -n1', (error, stdout) => {
                            if (error) {
                                cb(`exec error: ${error}`);
                                return;
                            }

                            errStr += `commit Name: ${stdout}`;

                            cb();
                        });
                    },
                ], cb);

            },
            // err to string
            (cb) => {
                errStr += 'name: ' + err.name + '\n';
                errStr += 'message: ' + err.message + '\n';
                errStr += err.stack + '\n';
                errStr += hr + '\n';

                cb();
            },
            // wripte error
            (cb) => {
                fs.writeFileSync(crashLogPath, errStr, {
                    flag: 'a',
                    encoding: 'utf8',
                });

                cb();
            },
        ], (error) => {
            if (error) return cb(error);

            cb(null, err);
        });
    };


    // process.on('exit', this.onEnd);
    process.on('SIGINT', data => {
        this.onEnd(data, 'SIGINT');
    });
    process.on('SIGTERM', data => {
        this.onEnd(data, 'SIGTERM');
    });
    process.on('uncaughtException', data => {
        this.onEnd(data, 'uncaughtException');
    });
}

module.exports = new AppHandler(app);
