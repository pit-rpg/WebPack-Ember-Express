module.exports = function(app) {
    Ember.TEMPLATES['helo'] = require('./helo.hbs');
    Ember.TEMPLATES['helo/world'] = require('./world.hbs');

    app.HeloRoute = Ember.Route.extend({
        actions: {
            err() {
                    this.err.set(new Error('aaaaaaaa'));
            }
        }
    });
};
