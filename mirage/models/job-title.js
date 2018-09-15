import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  users: hasMany('user'),
  availability: belongsTo('availability')
});
