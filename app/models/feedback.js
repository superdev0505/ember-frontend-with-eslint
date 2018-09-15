import Alertable from './alertable';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Alertable.extend({
  createdAt: attr(),
  updatedAt: attr(),

  user: belongsTo('user'),
  target: belongsTo('user'),
  availability: belongsTo('availability'),

  feedbackQuestionResponses: hasMany('feedback-question-responses')
});
