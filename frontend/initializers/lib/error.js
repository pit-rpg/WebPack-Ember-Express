var error, MError;

module.exports = function(app) {
    const ErrorReport = app.ErrorReport;

    if (!error) {
        MError = Ember.Object.extend({
            errorHandler: error,
            name: 'Error',
            message: 'some error occurred',
            liveTime: 0,
            icon: 'err',
            init: function(err) {
                this._super();

                if (err.status === 0) {
                    this.setProperties({
                        name: 'Offline',
                        message: 'Please check internet connection',
                    });
                } else if (err.responseJSON) {
                    if (err.responseJSON.name) {
                        this.set('name', err.responseJSON.name);
                    }
                    if (err.responseJSON.message) {
                        this.set('message', err.responseJSON.message);
                        if (NODE_DEV) {
                            this.set('message', this.get('message') + '\n' + err.responseJSON.stack);
                        }
                    }
                } else if (err.name || err.message) {
                    this.set('name', err.name);
                    if (err.stack) {
                        if (NODE_DEV) {
                            this.set('message', err.message + '\n' + err.stack);
                        }
                    } else {
                        this.set('message', err.message);
                    }
                } else if (typeof err === 'string') {
                    this.set('message', err);
                }

                if (NODE_DEV) {
                    if (console.trace) {
                        console.trace();
                    }
                }
                //                if (options.liveTime) {
                //                    Ember.run.later(this, function () {
                //                        this.errorHandler.removeError(this);
                //                    }, options.liveTime);
                //                }
            }
        });

        error = Ember.Object.create({
            errors: [],
            set: function(err, report = true) {

                if (err.status === 401) {
                    return err;
                } else if (typeof err === 'string') {
                    this.errors.pushObject(new MError(new Error(err)));
                } else {
                    this.errors.pushObject(new MError(err));
                }

                if (!err.status && report === true) {
                    app.ErrorReport.report(err);
                }

                return err;
            },
            actions: {
                removeError: function(err) {
                    this.errors.removeObject(err);
                }
            }
        });
    }
    return error;
};
