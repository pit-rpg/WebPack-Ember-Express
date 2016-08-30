module.exports = function(app) {
    Ember.TEMPLATES['site'] = require('./site.hbs');

    app.SiteRoute = Ember.Route.extend({});
};
