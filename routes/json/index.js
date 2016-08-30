'use strict';
var router;

module.exports = function(app) {
    if (router) return router;
    const express = require('express');

    router = express.Router();

    router.use('/someApiRoute', require('./someApiRoute')(app));

    return router;
};
