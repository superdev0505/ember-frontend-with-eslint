'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'oslr-ui2',
    podModulePrefix: 'oslr-ui2/pods',
    environment,
    rootURL: '',
    locationType: 'hash',
    // apiNamespace: 'api',
    // apiUrl: 'http://localhost:4200',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    DS: {
      host: 'http://localhost:4200',
      cableHost: 'ws://localhost:4200/cable'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      appVersion: process.env.OSLR_VERSION
    }
  };

  if (environment === 'development') {

    if (process.env.USE_API_FOR_TESTING) {
      ENV['ember-cli-mirage'] = {
        enabled: false
      };
      ENV.DS.host = 'http://localhost:3000';
      ENV.DS.cableHost = 'ws://localhost:3000/cable';
    } else {
      ENV['ember-cli-mirage'] = {
        enabled: true
      };
    }

    ENV['ember-simple-auth'] = {
      identification: 'email',
      routeAfterAuthentication: '/app/home/teach'
    };

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.rootURL = '/';
    ENV.APP.autoboot = false;
    ENV.APP.USE_API_FOR_TESTING = process.env.USE_API_FOR_TESTING;

    // By default test against Mirage
    // We also need to test against the API running on localhost
    // Use the environment variable USE_API_FOR_TESTING to set this
    if (process.env.USE_API_FOR_TESTING) {
      ENV['ember-cli-mirage'] = {
        enabled: false
      };
      ENV.DS.host = 'http://localhost:3000';
      ENV.DS.cableHost = 'ws://localhost:3000/cable';
    } else {
      ENV['ember-cli-mirage'] = {
        enabled: true
      };
    }

  }

  if (environment === 'staging') {
    ENV.rootURL = '/app/';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    // Point to Elastic Beanstalk staging API
    ENV.DS = {
      host: 'https://betaapi.oslr.co.uk',
      cableHost: 'ws://betaapi.oslr.co.uk/cable'
    };
  }

  if (environment === 'production') {
    ENV.rootURL = '/app/';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // here you can enable a production-specific feature
    ENV.DS = {
      host: 'https://betaapi.oslr.co.uk',
      cableHost: 'ws://betaapi.oslr.co.uk/cable'
    };
  }

  return ENV;
};
