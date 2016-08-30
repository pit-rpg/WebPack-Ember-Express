module.exports = function(app) {
    app.PagerMixin = Ember.Mixin.create({
        page: 0,
        limit: 15,
        query: {},

        __errorTest: function() {

            if (!this.get('collectionGetPath')) throw 'collectionGetPath is not specified';

        }.on('init'),

        ObserverModel: function() {
            var model = this.get('model');

            if (model && model.meta && model.meta.limit) {
                this.setProperties({
                    limit: model.meta.limit,
                    pagerHasPages: ((model.meta.count || 0) / model.meta.limit) >= 1,
                });
            }
        }.observes('model').on('init'),

        ObserverPage: function() {
            this.goTpPageAndFilter();
        }.observes('page'),

        countMeta(page = 1, limit = 5, query = {}) {
            page = Math.abs(page) || 1;
            query.limit = limit;
            query.offset = limit * (page - 1);
            return query;
        },

        toIndex() {
            if (this.page === 0) {
                return this.goTpPageAndFilter();
            }
            this.setProperties({
                query: {},
                page: 0,
            });
        },

        goTpPageAndFilter() {
            var query = this.get('query');
            var path = this.get('collectionGetPath');

            this.countMeta(this.get('page'), this.get('limit'), query);

            app.db.get(path, query)
                .then((data) => {
                    this.set('model', data);
                });
        },

        actions: {
            goTpPagerPage(page) {
                this.set('page', page.page);
            },
        },
    });
};
