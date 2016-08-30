function MyError(err, meta) {
    Object.setPrototypeOf(err, MyError.prototype);
    err.meta = meta || {};

    if(typeof err.stack === 'string'){
        err.stack = err.stack.replace(/\\n/g, "\n");
    }
    
    return err;
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

MyError.prototype.toJSON = function() {
    return {
        stack: this.stack,
        name: this.name,
        message: this.message,
        fileName: this.fileName,
        columnNumber: this.columnNumber,
        lineNumber: this.lineNumber,
        meta: this.meta,
    };
};

module.exports = MyError;
