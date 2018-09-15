import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  userLocations: hasMany('user-location'),
  users: hasMany('user'),
  availability: hasMany()
});
