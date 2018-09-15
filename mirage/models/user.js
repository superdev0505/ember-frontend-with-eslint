import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  jobTitle: belongsTo('job-title'),
  userLocations: hasMany('user-location'),
  locations: hasMany('location')
});
