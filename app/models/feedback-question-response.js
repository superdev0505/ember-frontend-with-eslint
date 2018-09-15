import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({

  feedback: belongsTo('feedback'),
  feedbackQuestion: belongsTo('feedback-question'),

  body: attr(),
  score: attr()
});
