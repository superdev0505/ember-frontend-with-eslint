import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({

  availability: belongsTo('availability'),
  item: belongsTo('item', { polymorphic: true }),
  user: belongsTo('user'),
  name: attr(),
  notes: attr()

});
