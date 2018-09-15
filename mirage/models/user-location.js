import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo('user'),
  location: belongsTo('location')
});
