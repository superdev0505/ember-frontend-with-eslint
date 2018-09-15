import { Factory, belongsTo, faker } from 'ember-cli-mirage';

export default Factory.extend({

  info() {
    return `${faker.company.companyName()}  Hospital`;
  },

  startTime() {
    return faker.date.past(10);
  },

  endTime() {
    return faker.date.past(9);
  },

  location: belongsTo('location'),
  user: belongsTo('user')
});
