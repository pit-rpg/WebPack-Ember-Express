module.exports = function(app) {
    Ember.TEMPLATES['components/social-shareFb'] = require('./template.hbs');

    const Share = require('../../../../lib/social-share.js');

    // var fbShare = 'https://www.facebook.com/sharer.php?u=';

    app.SocialShareFbComponent = Ember.Component.extend({
        classNames: ['social-shareFb', 'social-share'],
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

                Share.facebook(options);
            }
        },
    });
};
