/**
* Application authorizer. Minor configuration to send correct user_email field name.
*
* @module AppCore
* @class authorizers-devise
**/
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

export default DeviseAuthorizer.extend({

  identificationAttributeName: 'user_email'
});
