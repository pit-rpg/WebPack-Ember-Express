module.exports = function(app) {
    Ember.TEMPLATES['components/alert-error'] = require('./template.hbs');

    app.AlertErrorComponent = Ember.Component.extend({
        //        errors: [],
        classNames:['alert-error'],
        errors: Ember.computed.alias('err.errors'),
        isErrors: false,
        errorsObserver: function() {
            var errors = this.get('errors');
            this.set('isErrors', !!errors.length);
        }.observes('errors').on('init'),
        init: function() {
            this._super();
            this.set('errors', this.err.errors);
        },
        actions: {
            delErr: function(err) {
                var errors = this.get('errors');
                errors.removeObject(err);
            }
        }
    });
};
