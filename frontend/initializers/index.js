module.exports = function(app) {
    require('./err')(app);
    require('./db')(app);
    require('./session')(app);
    require('./router')(app);
};
