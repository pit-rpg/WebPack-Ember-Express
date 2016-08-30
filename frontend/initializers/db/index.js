module.exports = function () {
    var error = require('../lib/error')(Ember);

    var db = require('../../../lib/db');

    db.error = error;
    // db.Promise = Ember.RSVP.Promise;

    Ember.Application.initializer({
        name: 'db',

        initialize: function (application) {
            application.register('db:main', db, {
                instantiate: false
            });

            application.inject('route', 'db', 'db:main');
            application.inject('component', 'db', 'db:main');
            application.inject('controller', 'db', 'db:main');
        }
    });

};
