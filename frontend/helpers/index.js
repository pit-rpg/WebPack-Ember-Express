module.exports = function(app) {
    app.EqHelper = Ember.Helper.helper((params) => {
        return params[0] === params[1];
    });

    app.HelperHelper = Ember.Helper.helper((params, hash) => {
        var helper = params.shift();

        if (typeof helper === 'string') {
            helper = Ember.String.classify(helper + 'Helper');

            if (!app[helper]) throw new Error('helper is not defined');

            return app[helper].compute(params, hash);
        } else if (typeof helper === 'object') {
            if (!app[helper.helper]) throw new Error('helper is not defined');

            let _params = helper.params.concat(params);

            let _hash = Ember.copy(helper.hash);

            Object.assign(_hash, hash);

            return app[helper.helper].compute(_params, _hash);
        }
    });

    app.HelperWrapHelper = Ember.Helper.helper((params = [], hash = {}) => {
        var helper = params.shift();

        helper = Ember.String.classify(helper + 'Helper');

        if (!app[helper]) throw new Error('helper is not defined');

        return {
            helper,
            params,
            hash,
        };
    });

    app.NotEqHelper = Ember.Helper.helper((params) => {
        return params[0] !== params[1];
    });

    app.InvHelper = Ember.Helper.helper(([param]) => {
        return !param;
    });

    app.SomeHelper = Ember.Helper.helper((params) => {
        return params.some(e => e);
    });

    app.RoundHelper = Ember.Helper.helper((params) => {
        return _.round(params[0], params[1] || 2);
    });

    // app.FileToUriHelper = Ember.Helper.helper(([img]) => {
    //     if (!img) return;
    //     // Create an empty canvas element
    //     var canvas = document.createElement("canvas");
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //
    //     // Copy the image contents to the canvas
    //     var ctx = canvas.getContext("2d");
    //     ctx.drawImage(img, 0, 0);
    //
    //     // Get the data-URL formatted image
    //     // Firefox supports PNG and JPEG. You could check img.src to
    //     // guess the original format, but be aware the using "image/jpg"
    //     // will re-encode the image.
    //     var dataURL = canvas.toDataURL("image/png");
    //
    //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // });

    app.ReplaceNullHelper = Ember.Helper.helper(([replace, val]) => {
        if (val === null) return replace;
        return val;
    });
};
