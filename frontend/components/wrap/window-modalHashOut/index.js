module.exports = function(app) {

    Ember.TEMPLATES['components/window-modalHashOut'] = require('./template.hbs');

    app.WindowModalHashOutComponent = Ember.Component.extend({
        classNames: ['window-modalHashOut'],

        modalHash: Ember.inject.service(),
        // init() {
        //     this._super(...arguments);
        // },
        actions: {
            rm(modal) {
                this.get('modalHash').rm(modal);
                if (modal.close) modal.close(modal.value);
            },
            canselrRm(modal) {
                this.get('modalHash').rm(modal);
                if (modal.cansel) modal.cansel(modal.value);
            },
            okRm(modal) {
                this.get('modalHash').rm(modal);
                if (modal.ok) modal.ok(modal.value);
            },
            show(modal) {
                if (modal.show) modal.show(modal.value);
            },
        }
    });
};
