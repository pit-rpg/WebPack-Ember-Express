module.exports = function(source) {
    this.cacheable();
    return source.replace(/{{(?:[\S\s])*?\n((?:[\S\s])*?\n)*?[\s\S]*?}}/mg, '');
};
