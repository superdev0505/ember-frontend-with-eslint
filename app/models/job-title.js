/**
* Job titles e.g. FY1, final year student. Ranked by seniority (position attribute). Qualified determines if they are a qualified doctor or not.
*
* @module Users
* @class model-job-title
*/
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {  hasMany, belongsTo } from 'ember-data/relationships';
export default Model.extend({
  name: attr(),
  position: attr(),
  qualified: attr(),
  availability: belongsTo('availability'),

  users: hasMany('user')
});
