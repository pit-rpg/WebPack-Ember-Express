function Db() {
    this.queryContext = [];
    this.loadetScripts = [];
}

Db.Promise = Promise;

Db.prototype.checkContext = function(context) {
    if (!context) return false;
    if (this.queryContext.find((e) => {
            if (e === context) return true;
        })) {
        return true;
    } else {
        this.queryContext.push(context);
    }
};

Db.prototype.removeContext = function(context) {
    if (!context) return;
    var con = this.queryContext;
    for (var i = 0; i < con.length; i++) {
        if (con[i] === context) {
            con.splice(i, 1);
        }
    }
};

Db.prototype.extructFilesRecursive = function(obj, path, files) {
    if (!obj) return;
    if (!Array.isArray(obj) && typeof obj !== "object") {
        return;
    }
    if (!files) files = [];
    if (path) {
        path = path + '.';
    } else {
        path = '';
    }
    let val;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (Array.isArray(val)) {
                let i, mVal;
                for (i = 0; i < val.length; i++) {
                    mVal = val[i];
                    if (mVal instanceof File) {
                        files.push({
                            path: path + key + '.' + i,
                            file: mVal
                        });
                    } else {
                        // files[path + key + '.' + i] = mVal;
                        this.extructFilesRecursive(mVal, path + key + '.' + i, files);
                    }
                }
            } else if (val instanceof File) {
                files.push({
                    path: path + key,
                    file: val
                });
            } else {
                this.extructFilesRecursive(val, path + key, files);
            }
        }
    }
    return files;
};

Db.prototype.getMultipartOptions = function(method, model) {
    let otions = {
        method: method || "POST",
        contentType: false,
        processData: false,
        type: null,
        cache: false,
        data: new FormData(),
    };

    if (!model) return otions;

    otions.data.append('model', JSON.stringify(model));

    for (let file of this.extructFilesRecursive(model)) {
        otions.data.append(file.path, file.file);
    }

    return otions;
};

Db.prototype.getOptions = function(method = 'GET', model = undefined) {
    var data;
    if (method === 'GET') {
        data = model;
    } else if (model === undefined) {
        data = model;
    } else {
        data = JSON.stringify(model);
    }
    return {
        method,
        data,
        type: 'json',
        contentType: "application/json",
    };
};


Db.prototype.makeQuery = function(ajaxOptions, options, cb) {
    return new Db.Promise((resolve, reject) => {
        ajaxOptions.success = (data) => {
            this.removeContext(options.context);
            if (cb) {
                cb(null, data);
            }
            resolve(this.handle(null, data));
        };
        ajaxOptions.error = (err) => {
            this.removeContext(options.context);
            if (cb) {
                cb(err);
            }
            reject(this.handle(err));
        };
        $.ajax(ajaxOptions);
    });
};

Db.prototype.post = function(path, model, options, cb) {
    if (!options) {
        options = {
            multipart: false,
        };
    }

    if (this.checkContext(options.context)) return;

    let ajaxOptions;
    if (options.multipart) {
        ajaxOptions = this.getMultipartOptions("POST", model);
    } else {
        ajaxOptions = this.getOptions("POST", model);
    }
    ajaxOptions.url = path;
    return this.makeQuery(ajaxOptions, options, cb);
};

Db.prototype.put = function(path, model, options, cb) { // TODO RENEMA and remove this.put
    if (!options) {
        options = {
            multipart: false,
        };
    }

    if (this.checkContext(options.context)) return;

    let ajaxOptions;
    if (options.multipart) {
        ajaxOptions = this.getMultipartOptions("PUT", model);
    } else {
        ajaxOptions = this.getOptions("PUT", model);
    }
    ajaxOptions.url = path;
    return this.makeQuery(ajaxOptions, options, cb);
};



Db.prototype.delete = function(path, params, options, cb) {
    if (!options) options = {};

    if (this.checkContext(options.context)) return;

    var ajaxOptions = this.getOptions("DELETE", params);

    ajaxOptions.url = path;

    return this.makeQuery(ajaxOptions, options, cb);
};

Db.prototype.getFile = function(path, params, options, cb) {
    if (!params) {
        params = null;
    }
    var promis = new Promise((resolve, reject) => {
        $.ajax({
                url: path,
                dataType: 'text',
                data: params
            })
            .success((data) => {
                if (cb) {
                    cb(null, data);
                }
                resolve(this.handle(null, data));
            })
            .error((err) => {
                if (cb) {
                    cb(err);
                }
                reject(this.handle(err));
            });
    });
    return promis;
};

Db.prototype.dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
};

Db.prototype.blobToFile = function(blob, name) {
    return new File([blob], name);
};

Db.prototype.handle = function(err, data) {
    if (err) {
        if (this.error) {
            if (typeof this.error.set === 'function') {
                this.error.set(err);
                return err;
            }
            if (typeof this.error === 'function') {
                this.error(err);
                return err;
            }
        } else {
            console.error(err);
        }
    } else {
        return data;
    }
};


Db.prototype.get = function(path, params, options = {}) {
    var cb;

    if (this.checkContext(options.context)) return;

    if (typeof arguments[arguments.length - 1] === 'function') {
        cb = arguments[arguments.length - 1];
    }
    if (!params) {
        params = null;
    }

    var ajaxOptions = this.getOptions("GET", params);

    ajaxOptions.url = path;

    return this.makeQuery(ajaxOptions, options, cb);
};


Db.prototype.getScripts = function(libs, options, cb) {
    // some transpail errors with => func
    var self = this;

    return new Db.Promise(function(resolve, reject) {

        function loaderFunc(path, cb) {
            if (self.loadetScripts.hasOwnProperty(path)) return cb();
            $.getScript(path)
                .done((script) => {
                    self.loadetScripts[path] = script;
                    cb();
                })
                .fail((jqxhr, settings, exception) => {
                    cb(exception);
                });
        }

        function loadetFunc(err) {
            if (err) {
                if (cb) {
                    cb(err);
                }

                return reject(self.handle(err));
            }

            var result = libs.map(path => {
                return self.loadetScripts[path];
            });

            if (cb) {
                cb(null, result);
            }

            resolve(self.handle(null, result));
        }

        if (!options) options = {};

        if (options.sync) {
            _async.eachSeries(libs, loaderFunc, loadetFunc);
        } else {
            _async.each(libs, loaderFunc, loadetFunc);
        }

    });
};

Db.prototype.isScriptsLoadet = function(libs) {
    return libs.every(e => this.loadetScripts.hasOwnProperty(e));
};

var db = new Db();

module.exports = db;

if (NODE_DEV) {
    window.db = db;
}
