require('./style.less');

if (NODE_DEV) {
    Ember.run.backburner.DEBUG = true;
}

window._async = async;

var appOptions = {};

if (NODE_DEV) {
    appOptions.LOG_TRANSITIONS = true;
}

// appOptions.rootElement = '#MYAPP';


var app = Ember.Application.create(appOptions);




// if (NODE_DEV) {
window.App = app;
// }


module.exports = app;



// app.userSettings = Ember.Object.create({});

app.db = require('../lib/db');

// ErrorReport
// const ErrorReport = require('../lib/errorReport');
// Error.stackTraceLimit = 100;
// app.ErrorReport = new ErrorReport({
//     url: '/json/errorReport',
// });
// Ember.onerror = function(err) {
//     app.ErrorReport.report(err);
//     console.error(err, err.stack);
// };
// // Ember.RSVP.on('error', function(err) {
// //     app.ErrorReport.report(err);
// //     console.error(err, err.stack);
// // });
// Ember.Logger.error = function(message, cause, stack) {
//     var e = new Error(message);
//     e.stack = stack;
//     e.stack = stack;
//     e.meta = {
//         cause,
//     };
//     app.ErrorReport.report(e);
//     console.error(e, e.stack);
// };
// ErrorReport


Ember.STRINGS = require('../constants/loc');

app.deferReadiness(); // stop autogenerate aplication elements

require('./initializers')(app);
require('./services')(app);
require('./helpers')(app);

// mixins
require('./mixins/pager')(app);
// mixins

require('./components')(app);
require('./router')(app);
require('./routs')(app);

// app.session.startSession();
app.advanceReadiness(); //  autogenerate aplication elements
