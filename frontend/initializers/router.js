module.exports = function() {

    //     // app/initializers/component-router-injector.js
    // export function initialize(application) {
    //   // Injects all Ember components with a router object:
    // }
    //
    // export default {
    //   name: 'component-router-injector',
    //   initialize: initialize
    // };

    Ember.Application.initializer({
        name: 'router',

        initialize: function(application) {
            // application.register('session:main', session, {
            //     instantiate: false
            // });

            application.inject('component', 'router', 'router:main');
            application.inject('route', 'router', 'router:main');
            application.inject('component', 'router', 'router:main');
            application.inject('controller', 'router', 'router:main');
        }
    });

};
