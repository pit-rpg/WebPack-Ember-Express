module.exports = function(app) {
    Ember.TEMPLATES['components/social-shareGl'] = require('./template.hbs');

    const Share = require('../../../../lib/social-share.js');

    app.SocialShareGlComponent = Ember.Component.extend({
        classNames: ['social-shareGl', 'social-share'],
        size: 32,
        actions: {
            modal() {
                var options = this.getProperties('img', 'title', 'text');

                Share.googlePlus(options);
            }
        },
    });
};
