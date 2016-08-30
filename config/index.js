'use strict';

const config = {

};

switch (process.env.NODE_ENV) {
    case 'production':
        require('./prod')(config);
        break;
    default:
        require('./dev')(config);
}

module.exports = config;
