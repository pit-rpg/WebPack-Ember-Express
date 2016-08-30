module.exports = function(app) {
    Ember.TEMPLATES['components/input-pagination'] = require('./template.hbs');

    require('./stayle.less');

    app.InputPaginationComponent = Ember.Component.extend({
        classNames: ['input-pagination noselect'],
        meta: null,
        metaObserver: function() {
            var meta = this.get('meta');
            if (meta) {
                if (!this.get('limit')) {
                    this.set('limit', meta.limit);
                }
                this.set('offset', meta.offset);
                this.set('count', meta.count);
            }
        }.observes('meta'),
        count: 0,
        offset: 0,
        limit: 0,
        pegPading: 3,
        pages: Ember.A(),
        setPages: function() {
            var count = this.get('count');
            var limit = this.get('limit');
            var pegPading = this.get('pegPading');
            var pagesArray = this.get('pages');
            var pagesCount = Math.ceil(count / limit);
            var offset = this.get('offset') || 0;
            var curentPage = 1;
            if (offset) {
                curentPage = (offset / limit) + 1;
            }
            var pages = pagesCount;
            var pageMinLim = parseInt(curentPage) - pegPading;
            var pageMaxLim = parseInt(curentPage) + pegPading;
            var pageLimStart;
            if (pageMinLim < 1) {
                pageLimStart = 1;
                pageMaxLim = (pegPading * 2) + 1;
                if (pageMaxLim > pagesCount) {
                    pageMaxLim = pagesCount;
                }
            } else if (pageMaxLim >= pagesCount) {
                pageLimStart = pagesCount - (pegPading * 2);
                pageMaxLim = pagesCount;
                if (pageLimStart < 1) {
                    pageLimStart = 1;
                }
            } else {
                pageLimStart = pageMinLim;
                if (pageMaxLim > pagesCount) {
                    pageMaxLim = pagesCount;
                }
            }
            pagesArray.clear();
            pagesArray.pushObject({
                pageNum: "<<",
                id: 1
            });
            var active = false;
            for (var i = pageLimStart; i <= pageMaxLim; i++) {
                if (curentPage === i) {
                    active = true;
                } else {
                    active = false;
                }
                pagesArray.pushObject({
                    pageNum: i,
                    id: i,
                    active: active
                });
            }
            pagesArray.pushObject({
                pageNum: ">>",
                id: pages
            });
            this.set("pages", pagesArray);
        }.observes('count', 'limit', 'offset'),
        didInsertElement: function() {
            this.metaObserver();
            this.setPages();
        },
        actions: {
            goTo: function(page) {
                var params = {
                    page: page,
                    limit: this.get('limit'),
                    offset: this.get('offset'),
                };
                if (page <= 0) {
                    page = 1;
                }
                params.offset = params.limit * (page - 1);
                this.sendAction('action', params);
            }
        },
    });
};
