import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Alertable.extend({

  email: attr(),
  token: attr(),
  eventDescription: attr(),
  eventReflection: attr(),
  message: attr(),
  eventTime: attr(),
  completed_at: attr(),
  createdAt: attr(),
  updatedAt: attr(),

  user: belongsTo('user'),
  target: belongsTo('user'),
  availability: belongsTo('availability'),
  feedback: belongsTo('feedback')
});
