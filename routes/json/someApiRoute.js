'use strict';
module.exports = function(app) {

    const express = require('express');
    const router = express.Router();

    router.get('/', function(req, res) {
        res.send({
            status: 'succes',
        });
    });

    return router;
};
