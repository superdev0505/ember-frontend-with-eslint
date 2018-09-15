import { Model } from 'ember-cli-mirage';
import { belongsTo, hasMany } from 'ember-data/relationships';
export default Model.extend({
  location: belongsTo('location'),
  specialties: hasMany('specialty'),
  jobTitles: hasMany('job-title')
});
