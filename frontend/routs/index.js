module.exports = function(app) {
    require('./application')(app);
    require('./site')(app);
    require('./notFound')(app);
    require('./helo')(app);
};
