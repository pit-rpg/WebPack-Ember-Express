'use strict';
module.exports = function(app) {

    const express = require('express');
    const router = express.Router();
    // const busboyBodyParser = require('busboy-body-parser');
    const OrderHandler = app.Handlers.OrderHandler;
    // const RouteHandler = app.Handlers.RouteHandler;
    const UserHandler = app.Handlers.UserHandler;




    router.get('/orders',
        UserHandler.isLogined,
        OrderHandler.getOrdersUser);

    router.get('/',
        UserHandler.passRoles(UserHandler.ROLES.ADMIN),
        OrderHandler.getOrders);

    router.get('/:id',
        UserHandler.isLogined,
        OrderHandler.getOrder);



    router.put('/setStatus',
        UserHandler.passRoles(UserHandler.ROLES.ADMIN),
        OrderHandler.setStatus);

    router.put('/editAddress/:id',
        UserHandler.passRoles(UserHandler.ROLES.ADMIN),
        OrderHandler.editAddress);

    router.put('/editRecipient/:id',
        UserHandler.passRoles(UserHandler.ROLES.ADMIN),
        OrderHandler.editRecipient);



    router.post('/',
        UserHandler.isLogined,
        OrderHandler.create);

    return router;
};
