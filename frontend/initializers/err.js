module.exports = function(app) {
    var error = require('./lib/error')(app);

    if (NODE_DEV) {
        if (app.error) throw new Error('WTF!');
    }

    app.error = error;

    Ember.Application.initializer({
        name: 'err',

        initialize: function(application) {
            application.register('err:main', error, {
                instantiate: false
            });

            application.inject('route', 'err', 'err:main');
            application.inject('component', 'err', 'err:main');
            application.inject('controller', 'err', 'err:main');
        }
    });

};
