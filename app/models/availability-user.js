// import DS from 'ember-data';

// export default DS.Model.extend({

// });

/**
* AvailabilitySignUp module
*
* This model handles linking of users to teaching sessions. It includes:
* * Signing up
* * Inviting users
* * Accepting or declining invites
* * Administrator priviledges for a given teaching session
* * Who is a teacher and who is a student
*
* @module AvailabilitiesSignUp
* @main AvailabilitiesSignUp
* @class model-availability-user
*/
// import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  availability: belongsTo('availability'),
  user: belongsTo('user'),

  inviter: belongsTo('user'),

  admin: attr(),
  teacher: attr(),
  aasmState: attr(),
  createdAt: attr(),
  updatedAt: attr()
});
