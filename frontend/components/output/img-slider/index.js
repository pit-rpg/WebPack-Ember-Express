module.exports = function(app) {
    Ember.TEMPLATES['components/img-slider'] = require('./template.hbs');

    require('./style.less');

    app.ImgSliderComponent = Ember.Component.extend({
        classNames: ['img-slider'],
        image: '',
        index: 0,
        big: false,
        model: [], // images array
        init() {
            this._super();

            if (this.get('big')) this.classNames.addObject('big');

            this.setImgByIndex();
        },
        getIndex() {
            return parseInt(this.index) || 0;
        },
        setImgByIndex: function() {
            var model = this.get('model');
            var index = this.getIndex();

            if (!model || !model.length) return;

            var imagesCount = this.model.length;

            if (index >= imagesCount) {
                index = 0;
            } else if (index < 0) {
                index = imagesCount - 1;
            }

            this.setProperties({
                image: model[index],
                index: index,
            });
            this.sendAction('action', index);
        }.observes('model', 'index'),
        actions: {
            img(i) {
                this.set('index', i);
            },
            next() {
                this.set('index', this.getIndex() + 1);
            },
            prev() {
                this.set('index', this.getIndex() - 1);
            },
        }
    });
};
