module.exports = function(app) {

    app.InputFocusComponent = Ember.TextField.extend({
        classNames: ['input-focus'],
        becomeFocused: function() {
            this.$().focus();
        }.on('didInsertElement')
    });
    
};
