module.exports = function(app) {
    Ember.TEMPLATES['components/input-dropdown'] = require('./template.hbs');

    require('./style.less');

    app.InputDropdownComponent = Ember.Component.extend({
        classNames: ['input-dropdown'],
        // classNameBindings:['']
        values: null, // array of values
        value: null, // current value
        helper: null, // helper for values display
        title: '', // title for dropdown
        info: '', // short info string for dispaly
        height: 0, // fixset height for dropdown if 0 disabled
        openUp: false, // open dropdown up

        show: false,
        didInsertElement() {
            this.onClickHandler = (e) => {
                if (!this.show || !this.$) {
                    return;
                }
                var elem = this.$('.selectLable');

                if (!elem) return;
                if (elem.get(0) === e.target) {
                    return;
                }
                if (Array.from(elem.find('*')).includes(e.target)) {
                    return;
                }

                this.set('show', false);
            };

            this.$(document).bind("click", this.onClickHandler);
        },
        willDestroyElement() {
            this.$(document).unbind("click", this.onClickHandler);
        },
        actions: {
            select(val) {
                this.sendAction('action', val);
                this.set('show', false);
            },
            openSelect() {
                this.set('show', !this.get('show'));
            },
        }
    });
};
