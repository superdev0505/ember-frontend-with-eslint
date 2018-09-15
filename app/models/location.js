/**
* Defines a hospital.
*
* Joined to users through a user-location model.
*
* @module Users
* @class model-location
*/
// import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr(),
  latitude: attr(),
  longitude: attr(),
  availabilities: hasMany('availability'),

  userLocations: hasMany('user-location'),
  users: hasMany('users')

});
