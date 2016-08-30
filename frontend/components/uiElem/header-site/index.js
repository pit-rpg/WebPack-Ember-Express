module.exports = function(app) {
    Ember.TEMPLATES['components/header-site'] = require('./template.hbs');

    app.HeaderSiteComponent = Ember.Component.extend({
        tagName: 'header',
        classNames: ['header-site', 'noselect'],
        // some cool header logic ...
    });
};
