module.exports = function(app) {
    Ember.TEMPLATES['components/social-shareTw'] = require('./template.hbs');

    const Share = require('../../../../lib/social-share.js');

    app.SocialShareTwComponent = Ember.Component.extend({
        classNames: ['social-shareTw', 'social-share'],
        size: 32,
        img: '',
        title: '',
        text: '',
        actions: {
            modal() {
                var options = this.getProperties('img', 'title', 'text');
                var loc = window.location;

                if(options.img){
                    options.img = `${loc.origin}${options.img}`;
                }

                Share.twitter(options);
            }
        },
    });
};
