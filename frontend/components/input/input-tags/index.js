module.exports = function(app) {
    Ember.TEMPLATES['components/input-tags'] = require('./template.hbs');

    require('./style.less');

    app.InputTagsComponent = Ember.Component.extend({
        classNames: ['input-tags'],
        tags: [],
        tag: '',
        validateTag: function(tag) {
            if (tag.length < 2 || tag.length > 36) return true;
        },
        actions: {
            add: function() {
                var tag = this.get('tag');
                if (this.validateTag(tag)) {
                    return this.err.set(`tag length is ${tag.length} must be >2, <36`, false);
                }
                this.set('tag', '');
                tag = tag.replace(/(?:[\n\s]) +|^ +|[\n\s]$/mg, '');
                if (tag) {
                    this.tags.addObject(tag);
                }
            },
            rm: function(e) {
                this.tags.removeObject(e);
            },
            setTag: function(e) {
                this.tags.removeObject(e);
                this.set('tag', e);
            },
        }
    });
};
