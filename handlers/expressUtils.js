'use strict';
module.exports = function (app) {

    function ExpressUtils() {

        this.backupBody = function (req, res, next) {
            req.oldBody = req.body;
            next();
        };

        this.normalizeBody = function (req, res, next) {
            var body = req.body,
                i;

            for (i in body) {
                if (body[i] === 'undefined') {
                    body[i] = undefined;
                } else if (body[i] === 'null') {
                    body[i] = null;
                } else if (body[i] === 'true') {
                    body[i] = true;
                } else if (body[i] === 'false') {
                    body[i] = false;
                }
            }
            next();
        };
    }

    var expressUtils = new ExpressUtils();
    app.set('ExpressUtils', expressUtils);

};
