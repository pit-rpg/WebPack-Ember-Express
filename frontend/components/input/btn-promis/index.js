module.exports = function(app) {
    Ember.TEMPLATES['components/btn-promis'] = require('./template.hbs');

    require('./style.less');

    app.BtnPromisComponent = Ember.Component.extend({
        classNameBindings: ['waiting'],
        classNames: ['btn-promis', 'btn'],
        tagName: 'button',

        promisObserver: function() {
            var promis = this.get('promis');
            if (!promis) return;
            if(!promis.then) throw new Error('is not a promis'); 

            this.set('waiting', true);

            var hide = () => {
                this.set('waiting', false);
            };

            promis.then(hide, hide);
        }.observes('promis').on('init'),

        didInsertElement: function() {
            this.onClik = () => {
                this.sendAction('action');
            };

            this.$().bind('click', this.onClik);
        },
        willDestroyElement() {
            this.$().unbind('click', this.onClik);
        },
    });
};
