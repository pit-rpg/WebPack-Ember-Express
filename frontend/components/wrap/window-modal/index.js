module.exports = function(app) {

    Ember.TEMPLATES['components/window-modal'] = require('./template.hbs');

    require('./style.less');

    app.WindowModalComponent = Ember.Component.extend({
        classNames: ['window-modal'],
        value: null,
        title: '',
        btnOk: 0,
        btnCansel: 0,
        icon: 'info2',
        okMsg: null,
        canselMsg: null,
        buttons: false,
        modalVisble: true,
        _modal_visble: null,
        buttonsObserver: function() {
            if (this.get('btnOk') || this.get('btnCansel')) {
                this.set('buttons', true);
            } else {
                this.set('buttons', false);
            }
        }.observes('btnOk', 'btnCansel').on('init'),
        hide(cb) {
            if (this._modal_visble === false) return;

            console.log('||>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.trace();


            this.tweenBg.eventCallback("onReverseComplete", () => {
                this.tweenBg.eventCallback("onReverseComplete", null);
                this.set('_modal_visble', false);
                this.sendAction('close', this.get('value'));
                if (cb) cb();
            });

            this.tweenBg.reverse();
            this.tweenModal.reverse();
        },
        showModal() {
            if (this._modal_visble === true) return;

            var bg = this.$('.bg');
            var modal = this.$('.modal');

            this.tweenBg = TweenMax.to(bg.get(), 0.40, {
                display: 'block',
                opacity: 1,
                ease: Power3.easeOut,
            });

            this.tweenModal = TweenMax.to(modal.get(), 0.25, {
                delay: 0.15,
                rotationX: "0deg",
                Z: "-100%",
                scale: 1,
                opacity: 1,
                onComplete: () => {
                    this.set('_modal_visble', true);
                    this.sendAction('show', this.get('value'));
                },
            });
        },
        modalVisbleObserver: function() {
            if (this.get('modalVisble')) {
                this.showModal();
            } else {
                this.hide();
            }
        }.observes('modalVisble'),
        closeModal(){
            this.hide(() => {
                this.sendAction('cansel', this.get('value'));
            });
        },
        didInsertElement() {
            if (this.get('modalVisble')) this.showModal();
            var modal = this;

            this.onESC = (event) => {
                if (event.keyCode === 27) {
                    modal.closeModal();
                }
                return true;
            };

            this.$(document).bind('keydown', this.onESC);
        },
        willDestroyElement(){
            this.$(document).unbind('keydown', this.onESC);
        },
        actions: {
            cansel() {
                this.closeModal();
                return false;
            },
            ok() {
                this.hide(() => {
                    this.sendAction('ok', this.get('value'));
                });
            }
        }
    });
};
