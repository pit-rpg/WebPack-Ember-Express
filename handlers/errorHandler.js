function ErrorHandler() {
    var notEnoughParamsMsg = 'Not enough params ned: ';
    var notEnoughParamsMsg2 = 'Not enough params.';
    var validatorErrors1 = 'Got some errors!';
    var validatorErrors2 = 'Got some errors: ';


    this.notEnoughParams = function(params) {
        var err = new Error();
        err.name = 'Error 403';
        err.status = 403;

        if (typeof params === 'string') {
            err.message = notEnoughParamsMsg + params;
        } else if (Array.isArray(params)) {
            err.message = notEnoughParamsMsg + params.join(', ');
        } else {
            err.message = notEnoughParamsMsg2;
        }

        if (arguments.length === 0) {
            return err;
        }
        return err;
    };

    this.errLog = function(err) {
        console.log(err);
    };

    this.validator = function(errors) {
        var err = new Error();
        err.name = 'Error 403';
        err.message = validatorErrors2 + errors.join('; ');
        err.status = 403;

        if (arguments.length === 0) {
            err.message = validatorErrors1;
        }
        return err;
    };

    this.error404 = function() {
        var err = new Error();
        err.name = 'Error 404';
        err.message = 'Not found';
        err.status = 404;
        return err;
    };

    this.emailNotExist = function() {
        var err = new Error();
        err.name = 'Error 404';
        err.message = 'Email not exist or user not registered.';
        err.status = 404;
        return err;
    };

    this.alreadyExistEmail = function() {
        var err = new Error();
        err.name = 'Already Exist';
        err.message = 'Email already exist.';
        err.status = 400;
        return err;
    };

    this.alreadyExistUserName = function() {
        var err = new Error();
        err.name = 'Already Exist';
        err.message = 'Username already exist.';
        err.status = 400;
        return err;
    };

    this.wrongPassword = function() {
        var err = new Error();
        err.name = 'Error';
        err.message = 'Wrong password';
        err.status = 404;
        return err;
    };

    this.needName = function() {
        var err = new Error();
        err.name = 'Need name';
        err.message = 'Please insert your name';
        err.status = 406; // Not Acceptable
        return err;
    };


    this.banned = function() {
        var err = new Error();
        err.name = 'Forbidden';
        err.message = 'You are banned!';
        err.status = 403;
        return err;
    };

    this.forbidden = function() {
        var err = new Error();
        err.name = 'Forbidden';
        err.message = 'Forbidden';
        err.status = 403;
        return err;
    };

    this.invalidToken = function() {
        var err = new Error();
        err.name = 'Invalid token';
        err.message = 'Invalid token or token not exist!';
        err.status = 404;
        return err;
    };
}

module.exports = new ErrorHandler();
