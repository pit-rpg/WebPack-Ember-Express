module.exports = function(app) {
    Ember.TEMPLATES['components/crud-user'] = require('./template.hbs');

    require('stayle.less');

    app.CrudUserComponent = Ember.Component.extend({
        classNames: ['crud-user'],
    });
};
