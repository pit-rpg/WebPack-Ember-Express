module.exports = function(app) {
    Ember.TEMPLATES['notFound'] = require('./notFound.hbs');

    // app.NotFoundController = Ember.Controller.extend({
    //     sizes: app.RingSizes,
    // });
};
