window._async = async;

if (NODE_DEV) {
    Ember.run.backburner.DEBUG = true;
}

var appOptions = {};

if (NODE_DEV) {
    appOptions.LOG_TRANSITIONS = true;
}
// appOptions.rootElement = '#MYAPP';

var app = Ember.Application.create(appOptions);

if (NODE_DEV) {
    window.App = app;
    module.exports = app;
}

// some user settings
app.userSettings = Ember.Object.create({});

app.db = require('../../lib/db');

// // ErrorReport
// const ErrorReport = require('../../lib/errorReport');
// app.ErrorReport = new ErrorReport({
//     url: '/json/errorReport',
// });
// Error.stackTraceLimit = 100;
// Ember.onerror = function(err) {
//     app.ErrorReport.report(err);
//     console.error(err, err.stack);
//     return true;
// };
// Ember.RSVP.on('error', function(err) {
//     if (err) {
//         app.ErrorReport.report(err);
//         console.error(err, err.stack);
//     }
//     return true;
// });
// Ember.Logger.error = function(message, cause, stack) {
//     var e = new Error(message);
//     e.stack = stack;
//     e.stack = stack;
//     e.meta = {
//         cause,
//     };
//     app.ErrorReport.report(e);
//     console.error(e, e.stack);
//     return true;
// };
// window.onerror = function(errorMsg) {
//     app.ErrorReport.report(new Error(errorMsg));
//     return false;
// };
// ErrorReport

require('./stale.less');

Ember.STRINGS = require('../../constants/loc');

app.deferReadiness(); // stop autogenerate aplication elements

require('../initializers')(app);
require('../services')(app);
require('../helpers')(app);
// mixins
require('../mixins/pager')(app);
// mixins

require('./router')(app);
require('./routs')(app);

// app.session.checkSessionUrl += '/admin';
// app.session.startSession();

app.advanceReadiness(); //  autogenerate aplication elements
