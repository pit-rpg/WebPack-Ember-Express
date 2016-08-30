const MyError = require('./classError');

function ErrorReport(options) {
    this.url = options.url;
    this.method = options.method || 'POST';

    if (!this.url) {
        throw new Error('URL is not defined');
    }
}

ErrorReport.prototype.report = function(err, meta) {
    meta = meta || {};

    if (typeof window !== 'undefined') {
        meta.location = window.location;
    }

    err = this.formatErr(err, meta);

    $.ajax({
        url: this.url,
        method: this.method,
        type: 'json',
        contentType: "application/json",
        data: JSON.stringify(err),
    });
};

ErrorReport.prototype.formatErr = function(err, meta) {
    if (!err) {
        err = new Error();
    } else if (Array.isArray(err)) {
        err = new Error(err.join());
    } else if (typeof err === 'string') {
        err = new Error(err);
    }
    return new MyError(err, meta);
};

module.exports = ErrorReport;
