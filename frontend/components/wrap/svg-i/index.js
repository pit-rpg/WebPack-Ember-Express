module.exports = function(app) {
    Ember.TEMPLATES['components/svg-i'] = require('./template.hbs');

    require('./style.less');

    app.SvgIComponent = Ember.Component.extend({
        mIcon: '',
        icon: 'close',
        icons: require('../../../svg-icons'),
        size: 0,
        tagName: 'i',
        didInsertElement() {
            this.$().attr('title', this.get('title'));
        },
        iconObserver: function() {
            var icon = this.get('icon');
            this.setProperties({
                'mIcon': this.get(`icons.${icon}`),
                classNames: ['svg-i', `svg-icon-${icon}`],
            });
        }.observes('icon').on('init'),
    });
};
