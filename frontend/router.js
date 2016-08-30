module.exports = function(app) {
    var config = require('./config');

    app.Router = Ember.Router.extend({
        rootURL: config.rootURL,
        location: config.location,
    });

    app.Router.map(function() {

        this.route('site', {
            path: '/'
        });

        this.route('helo', {
            path: '/h-e-l-o'
        }, function() {
            this.route('world', {
                path: '/world'
            });

        });

        this.route('notFound', {
            path: '/*path'
        });
    });
};
