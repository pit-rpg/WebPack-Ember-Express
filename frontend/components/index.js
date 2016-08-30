module.exports = function(app) {
    // require('./input/btn-promis')(app);
    // require('./input/input-checkbox')(app);
    // require('./input/input-dropdown')(app);
    // require('./input/input-focus')(app);
    // require('./input/input-pagination')(app);
    // require('./input/input-slider')(app);
    // require('./input/input-tags')(app);
    require('./output/alert-error')(app);
    // require('./output/img-slider')(app);
    // require('./social/social-shareFb')(app);
    // require('./social/social-shareGl')(app);
    // require('./social/social-shareTw')(app);
    require('./uiElem/header-site')(app);
    require('./wrap/svg-i')(app);
    require('./wrap/window-modal')(app);
    require('./wrap/window-modalHash')(app);
    require('./wrap/window-modalHashOut')(app);
};
