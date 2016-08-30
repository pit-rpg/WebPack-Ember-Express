'use strict';

module.exports = function(app, cb) {
    app.set('ErrorHandler', require('./errorHandler'));
    app.set('ValidatorHandler', require('./validatorHandler'));

    require('./expressUtils')(app);

    require('./appHandler');

    app.Services = {};
    app.Handlers = {};

    _async.series([
        // some service setup
        (cb) => {
            cb();
        },
    ], (err) => {
        if (err) return cb(err);

        cb();
    });
};
