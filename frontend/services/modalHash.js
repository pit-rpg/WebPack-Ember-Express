module.exports = function(app) {
    app.ModalHashService = Ember.Service.extend({
        modals: [],
        add(alert) {
            this.modals.addObject(alert);
        },
        rm(alert) {
            this.modals.removeObject(alert);
        },
    });
};
