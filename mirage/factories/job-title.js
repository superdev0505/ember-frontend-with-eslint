import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.jobTitle();
  },

  position() {
    return faker.name.jobType();
  },

  qualified() {
    return faker.random.boolean();
  }
});
