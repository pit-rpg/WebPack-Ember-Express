module.exports = function(app) {
    Ember.TEMPLATES['components/input-checkbox'] = require('./template.hbs');

    require('./style.less');

    app.InputCheckboxComponent = Ember.Component.extend({
        classNames: ['input-checkbox'],
        pointer: true,
        actions: {
            toggle: function() {
                if (this.get('model') === undefined) {
                    this.sendAction('action', !this.get('value'));
                } else {
                    this.sendAction('action', this.get('model'));
                }
            },
        }
    });
};
