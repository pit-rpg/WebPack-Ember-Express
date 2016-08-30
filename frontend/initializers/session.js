module.exports = function(app) {

    var session = Ember.Object.create({
        user: null,
        isLogined: false,
        checkSessionUrl: '/session',
        startSession(cb) {
            this.checkSession((err, user) => {
                if (err) {
                    if (err.status !== 401) {
                        if (cb) cb(err);
                        console.error(err);
                        return;
                    }
                }

                if (cb) cb(null, user);
            });
        },
        loginLocal(email, password, cb) {
            Ember.$.ajax({
                url: "/session/local/login",
                method: 'POST',
                dataType: 'json',
                data: {
                    email: email,
                    password: password,
                },
                success: (data) => {
                    this.onGetUserData(data, cb);
                },
                error: (err) => {
                    this.onGetUserDataError(err, cb);
                }
            });
        },
        registerLocal(email, password, username, cb) {
            Ember.$.ajax({
                url: "/session/local/register",
                method: 'POST',
                dataType: 'json',
                data: {
                    email,
                    password,
                    username,
                },
                success: (data) => {
                    this.onGetUserData(data, cb);
                },
                error: (err) => {
                    this.onGetUserDataError(err, cb);
                }
            });
        },
        onGetUserData(data, cb) {
            this.setProperties({
                user: data.user,
                serverDate: data.date,
                serverDateAt: Date.now(),
                isLogined: true
            });

            if (cb) {
                cb(null, data.user);
            }
        },
        onGetUserDataError(err, cb) {
            var props = {
                user: null,
                isLogined: false,
            };

            if (err.responseJSON && err.responseJSON.date) {
                props.serverDate = err.responseJSON.date;
                props.serverDateAt = Date.now();
            }

            this.setProperties(props);

            if (app.error || app.error.set) {
                app.error.set(err);
            }

            if (cb) {
                cb(err);
            }
        },
        checkSession: function(cb) {
            setTimeout(() => {
                Ember.$.ajax({
                    // replace url if need before
                    // send query
                    url: this.checkSessionUrl,
                    method: 'GET',
                    dataType: 'json',
                    success: (data) => {
                        this.onGetUserData(data, cb);
                    },
                    error: (err) => {
                        this.onGetUserDataError(err, cb);
                    }
                });
            }, 10);
        },

        logout: function(cb) {
            Ember.$.ajax({
                url: "/session/logout",
                method: 'GET',
                dataType: 'json',
                success: (data) => {
                    this.setProperties({
                        user: null,
                        isLogined: false
                    });
                    if (cb) {
                        cb(null, data);
                    }
                },
                error: (err) => {
                    if (cb) {
                        cb(err);
                    }
                }
            });
        },

        getYear() {
            var date = this.serverDate || Date.now();
            return new Date(date).getFullYear();
        },
    });

    Ember.Application.initializer({
        name: 'session',

        initialize: function(application) {
            application.register('session:main', session, {
                instantiate: false
            });

            application.inject('route', 'session', 'session:main');
            application.inject('component', 'session', 'session:main');
            application.inject('controller', 'session', 'session:main');
        }
    });
    app.session = session;
};
