'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let env = EmberApp.env();
  let isProduction = ['staging', 'production'].includes(env);

  let app = new EmberApp(defaults, {
    emberValidator: {
      useDateValidator: false
    },

    // Add options here
    minifyJS: { enabled: isProduction },
    minifyCSS: { enabled: isProduction, options: { relativeTo: 'assets' } },
    // sassOptions: {
    //   includePaths: [
    //     'node_modules/ember-power-select/app/styles'
    //   ]
    // },

    fingerprint: {
      // exclude: ['fonts/169929'],
      enabled: isProduction,
      prepend: 'https://s3-eu-west-2.amazonaws.com/oslr-ui2-codeship-deploy/'
      // prepend: `https://s3-eu-west-1.amazonaws.com/oslr-${env}-app/`
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
