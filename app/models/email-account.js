import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { belongsTo } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});
export default Model.extend(Validations, {
  user: belongsTo('user'),
  email: attr(),
  verified: attr(),
  confirmed: attr('boolean', { defaultValue: false }),
  primary: attr('boolean', { defaultValue: false }),

  unconfirmed: computed('confirmed', function() {
    return !this.get('confirmed');
  }),

  unverified: computed('verified', function() {
    return !this.get('verified');
  }),

  isPrimary: not('primary')
});
