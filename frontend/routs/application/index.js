module.exports = function(app) {
    Ember.TEMPLATES['application'] = require('./application.hbs');

    app.ApplicationController = Ember.Controller.extend({
        // currentPathDidChangeTEST: function() {
        //     app.set('currentPath', this.get('currentPath'));
        // }.observes('currentPath').on('init'),
    });
};
