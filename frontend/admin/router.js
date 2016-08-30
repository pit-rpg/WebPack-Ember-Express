module.exports = function(app) {
    var config = require('../config');

    app.Router = Ember.Router.extend({
        rootURL: config.rootURL,
        location: config.location,
    });

    app.Router.map(function() {
        this.route('admin', {
            path: '/admin'
        });
    });
};
