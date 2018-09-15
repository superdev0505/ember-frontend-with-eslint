// import DS from 'ember-data';

// export default DS.Model.extend({

// });

/**
* Join model connecting users and hospitals.
*
* @module Users
* @class model-user-location
*/
// import DS from 'ember-data';
import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  user: belongsTo('user'),
  location: belongsTo('location')
});
