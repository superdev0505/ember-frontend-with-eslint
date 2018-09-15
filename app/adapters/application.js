/**
* Application adapter. Uses devise authorizer, and data adapter mixin from ember-simple-auth for route authentication.
*
* Custom headers pass the application version and environment with each response.
*
* Includes some hack methods to allow side loading from JSONAPI-resources.
*
* @module AppCore
* @class adapter-application
**/
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: config.DS.host,
  // authorizer: 'authorizer:devise',
  // session: service('session'),
  // defaults
  // identificationAttributeName: 'email'
  // tokenAttributeName: 'token'
  authorize(xhr) {
    let { user_email, token } = this.get('session.data.authenticated');
    let authData = `Token token="${token}", user_email="${user_email}"`;
    xhr.setRequestHeader('Authorization', authData);
  },

  init() {
    this._super(...arguments);

    this.set('headers', {
      'x-vendor-appVersion': config.APP.appVersion,
      'x-vendor-appEnvironment': config.environment
    });
  },

  urlForFindRecord(query, modelName, snapshot) {
    let url = this._super(...arguments);

    return this._processIncludes(url, snapshot);
  },

  urlForFindAll(query, modelName, snapshot) {
    let url = this._super(...arguments);

    return this._processIncludes(url, snapshot);
  },

  _processIncludes(url, snapshot) {
    let options = snapshot && snapshot.adapterOptions;

    if (options && options.include) {
      url = `${url}?include=${options.include}`;
    }

    return url;
  }
});
