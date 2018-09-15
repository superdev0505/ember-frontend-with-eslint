
import { Factory, faker, association } from 'ember-cli-mirage';
export default Factory.extend({

  name() {
    return faker.name.firstName();
  },
  email() {
    return faker.internet.email();
  },
  bio() {
    return faker.lorem.paragraph();
  },
  password() {
    return faker.internet.password();
  },

  jobTitle: association()

});
