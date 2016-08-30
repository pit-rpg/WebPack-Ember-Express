module.exports = function(app) {

    Ember.TEMPLATES['components/window-modalHash'] = require('./template.hbs');

    app.WindowModalHashComponent = Ember.Component.extend({
        // classNames: ['window-modal-hash'],
        title: '',
        btnOk: 0,
        btnCansel: 0,
        icon: 'info2',
        okMsg: null,
        canselMsg: null,
        modalVisble: true,

        component: null, // hash
        ok: null, // hash
        cansel: null, // hash

        modalHash: Ember.inject.service(),

        init() {
            this._super(...arguments);

            var props = this.getProperties([
                'classNames',
                'title',
                'btnOk',
                'btnCansel',
                'icon',
                'okMsg',
                'canselMsg',
                'component',
                'ok',
                'cansel',
                'show',
                'close',
                'modalVisble',
            ]);

            this.set('modalProps', props);
            this.get('modalHash').add(props);
        },
        willDestroyElement() {
            this.set('modalProps.modalVisble', false);
            // console.log(modalProps);
            // modalProps.set('visble', false);
            //     .rm(this.get('modalProps'));
            // console.log('WILL_DESTROY_ELEMENT');
            // this.set('modalProps.visble', false);
        }
    });
};
