module.exports = function(app) {
    Ember.TEMPLATES['components/input-slider'] = require('./template.hbs');

    require('./style.less');

    app.InputSliderComponent = Ember.Component.extend({
        // options
        value: 0,
        min: 0,
        max: 0,
        live: false, // alwse on change fire action "action"
        edges: false,
        // options
        // actions: action mouseup mousedown
        availableInCenter: 0,
        arrowWidth: 0,
        offset: 0,
        edgesObserver: function() {
            if (this.get('edges')) {
                this.set('classNames', ['slider','input-slider', 'edges']);
            } else {
                this.set('classNames', ['slider', 'input-slider']);
            }
        }.observes('edges').on('init'),
        setDefaultParams: function() {
            var center, arrow, centerWidth, arrowWidth;
            center = this.$('.center');
            arrow = this.$('.arrow');
            centerWidth = center.innerWidth();
            arrowWidth = arrow.width();
            var availableInCenter = centerWidth - arrowWidth;
            this.set('availableInCenter', availableInCenter);
            this.set('arrowWidth', arrowWidth);
            this.calculateOffset();
        },
        calculateOffset: function() {
            var arrow = this.$('.arrow');
            var max = this.get('max');
            var min = this.get('min');
            var value = this.get('value');
            var availableInCenter = this.get('availableInCenter');
            var delta = max - min;
            var offset = (availableInCenter / delta) * (value - min);
            arrow.css({
                left: offset
            });
        },
        valueObserver: function() {
            this.calculateOffset();
        }.observes('value', 'min', 'max'),
        setOffset: function(offset) {
            var max = this.get('max');
            var min = this.get('min');
            var delta = max - min;
            var availableInCenter = this.get('availableInCenter');
            var value = ((delta / availableInCenter) * offset) + min;
            if (value > max) {
                value = max;
            }
            if (value < min) {
                value = min;
            }

            this.sendAction('action', value);
        },
        setOffsetByClick: function(offset) {
            var arrowWidth = this.get('arrowWidth');
            offset = offset - (arrowWidth / 2);
            this.setOffset(offset);
            return offset;
        },
        didInsertElement: function() {
            this.setDefaultParams();
            var self = this;
            var arrow = this.$('.arrow');
            var center = this.$('.center');
            var params = {
                axis: "x",
                containment: center,
                stop: function(e, ui) {
                    self.setOffset(ui.position.left);
                    self.sendAction('mouseup', self.get('value'));
                },
                start: function() {
                    self.sendAction('mousedown', self.get('value'));
                }
            };
            if (this.get('live')) {
                params.drag = function(e, ui) {
                    self.setOffset(ui.position.left);
                };
            }

            arrow.draggable(params);

            center.click(function() {
                var relX = event.pageX - $(this).offset().left;
                self.setOffsetByClick(relX);
                self.sendAction('mousedown', self.get('value'));
            });

        },
        actions: {
            min: function() {
                this.set('value', this.get('min'));
                this.sendAction('mouseup', this.get('value'));
            },
            max: function() {
                this.set('value', this.get('max'));
                this.sendAction('mouseup', this.get('value'));
            }
        }
    });
};
