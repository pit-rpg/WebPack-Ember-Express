module.exports = function(app) {
    'use strict';
    const express = require('express');
    const UserHandler = app.Handlers.UserHandler;
    // const passport = require('passport');
    const router = express.Router();

    const dev = app.get('env') !== 'production';
    const now = Date.now();

    const assets = require('../public/frontend/assets');

    router.use('/json', require('./json')(app));

    router.get('/admin*',
        function(req, res) {
            res.render('admin', {
                dev: dev,
                now: now,
                assets,
            });
        });

    router.get('/', function(req, res) {
        res.render('index', {
            dev: dev,
            now: now,
            assets,
        });
    });

    router.get('/index.html', function(req, res) {
        res.render('index', {
            dev: dev,
            now: now,
            assets,
        });
    });


    return router;
};
